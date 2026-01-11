import subprocess
import tempfile
import os

def render_latex_to_pdf(latex_source: str, output_pdf: str):
    with tempfile.TemporaryDirectory() as tmpdir:
        tex_path = os.path.join(tmpdir, "document.tex")

        with open(tex_path, "w") as f:
            f.write(latex_source)

        subprocess.run(
            ["pdflatex", "-interaction=nonstopmode", "document.tex"],
            cwd=tmpdir,
            check=True,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL
        )

        os.rename(
            os.path.join(tmpdir, "document.pdf"),
            output_pdf
        )

# -------- Example LaTeX (ANYTHING WORKS) --------
latex_code = r"""
\documentclass[12pt]{article}
\usepackage{amsmath, amssymb}
\usepackage{geometry}
\geometry{margin=1in}

\begin{document}

\section*{Euclidean Geometry}

\textbf{Pythagoras Theorem}

For a right-angled triangle:
\[
a^2 + b^2 = c^2
\]

\subsection*{Gaussian Integral}
\[
\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
\]

\end{document}
"""

render_latex_to_pdf(latex_code, "output.pdf")

print("PDF generated: output.pdf")
