"""
Sitemap Generator for Study with Junn
--------------------------------------
Scans all HTML files, reads their last-modified date from the filesystem,
and generates sitemap.xml with the XSL stylesheet reference.

Usage:  python generate_sitemap.py

Override defaults by editing the OVERRIDES dict below.
"""

import os
import datetime
import urllib.parse
import xml.etree.ElementTree as ET
from xml.dom import minidom

# =============================================================
#  CONFIGURATION — Edit these to your liking
# =============================================================

BASE_URL = "https://lordjunn.github.io/Study-With-Junn/"
ROOT_DIR = os.path.dirname(os.path.abspath(__file__))

# Default values for all pages
DEFAULT_PRIORITY = "0.5"
DEFAULT_CHANGEFREQ = "yearly"

# Files/patterns to exclude from sitemap
EXCLUDE = [
    "googled56de59a594a0c09.html",  # Google verification
    "Module Format.html",            # Templates
    "Notes Format.html",
    "Subject Format.html",
    "Exam Format.html",
    "Notes 1 - Copy (2).html",      # Duplicates
    "Notes 1 - Copy (3).html",
    "Notes 2 (1).html",
]

# Override priority and changefreq for specific files.
# Key = relative path (use / as separator), Value = (priority, changefreq)
# 
# Valid changefreq: always, hourly, daily, weekly, monthly, yearly, never
# Priority: 0.0 to 1.0
#
# Example:
#   "index.html": ("1.0", "weekly"),
#   "Math 1.html": ("0.9", "monthly"),
OVERRIDES = {
    "index.html":       ("1.0", "weekly"),
    "Update logs.html": ("0.8", "weekly"),
    # Add more overrides here as needed, e.g.:
    # "TCS 3351/Module 1.html": ("0.7", "monthly"),
}

# =============================================================
#  GENERATOR — No need to edit below this line
# =============================================================

def get_last_modified(filepath):
    """Get file's last modified date as YYYY-MM-DD string."""
    timestamp = os.path.getmtime(filepath)
    return datetime.datetime.fromtimestamp(timestamp).strftime("%Y-%m-%d")


def should_exclude(filename):
    """Check if file should be excluded from sitemap."""
    return filename in EXCLUDE


def generate():
    urls = []

    for dirpath, _, filenames in os.walk(ROOT_DIR):
        for filename in filenames:
            if not filename.endswith(".html"):
                continue
            if should_exclude(filename):
                continue

            filepath = os.path.join(dirpath, filename)
            rel_path = os.path.relpath(filepath, ROOT_DIR).replace("\\", "/")

            # Skip files in hidden/special directories
            if rel_path.startswith("."):
                continue

            lastmod = get_last_modified(filepath)
            encoded_path = urllib.parse.quote(rel_path, safe="/")
            full_url = BASE_URL + encoded_path

            # Check for overrides
            if rel_path in OVERRIDES:
                priority, changefreq = OVERRIDES[rel_path]
            else:
                priority = DEFAULT_PRIORITY
                changefreq = DEFAULT_CHANGEFREQ

            urls.append((full_url, lastmod, changefreq, priority))

    # Sort: highest priority first, then alphabetically
    urls.sort(key=lambda x: (-float(x[3]), x[0]))

    # Build XML
    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<?xml-stylesheet type="text/xsl" href="sitemap.xsl"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ]

    for loc, lastmod, changefreq, priority in urls:
        lines.append("  <url>")
        lines.append(f"    <loc>{loc}</loc>")
        lines.append(f"    <lastmod>{lastmod}</lastmod>")
        lines.append(f"    <changefreq>{changefreq}</changefreq>")
        lines.append(f"    <priority>{priority}</priority>")
        lines.append("  </url>")

    lines.append("</urlset>")

    output_path = os.path.join(ROOT_DIR, "sitemap.xml")
    with open(output_path, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))

    print(f"sitemap.xml generated with {len(urls)} URLs")
    print(f"  Overridden: {sum(1 for u in urls if u[3] != DEFAULT_PRIORITY)}")
    print(f"  Default ({DEFAULT_CHANGEFREQ}, {DEFAULT_PRIORITY}): {sum(1 for u in urls if u[3] == DEFAULT_PRIORITY)}")


if __name__ == "__main__":
    generate()
