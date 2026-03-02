<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">
<xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
<xsl:template match="/">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>Sitemap — Study with Junn</title>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <style type="text/css">
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
      background: #f0f2f5;
      color: #1a1a2e;
      padding: 30px 20px;
    }
    .container {
      max-width: 1100px;
      margin: 0 auto;
    }
    h1 {
      font-size: 28px;
      font-weight: 700;
      color: #6e54fa;
      margin-bottom: 6px;
    }
    .subtitle {
      color: #5a7184;
      font-size: 14px;
      margin-bottom: 24px;
    }
    .stats {
      display: flex;
      gap: 20px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }
    .stat-box {
      background: #fff;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 14px 22px;
      font-size: 14px;
      color: #5a7184;
    }
    .stat-box strong {
      color: #1a1a2e;
      font-size: 20px;
      display: block;
      margin-bottom: 2px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      background: #fff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0,0,0,0.08);
    }
    thead th {
      background: #6e54fa;
      color: #fff;
      font-weight: 600;
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      padding: 14px 16px;
      text-align: left;
    }
    tbody tr {
      border-bottom: 1px solid #f0f2f5;
      transition: background 0.15s;
    }
    tbody tr:hover {
      background: #f8f7ff;
    }
    tbody tr:last-child {
      border-bottom: none;
    }
    td {
      padding: 12px 16px;
      font-size: 14px;
      color: #334155;
    }
    td:first-child {
      max-width: 600px;
      word-break: break-all;
    }
    td a {
      color: #6e54fa;
      text-decoration: none;
    }
    td a:hover {
      text-decoration: underline;
      color: #4500c6;
    }
    .priority-high { color: #16a34a; font-weight: 600; }
    .priority-med  { color: #d97706; font-weight: 600; }
    .priority-low  { color: #94a3b8; }
    @media (max-width: 700px) {
      td, th { padding: 10px 10px; font-size: 13px; }
      h1 { font-size: 22px; }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>&#x1F5FA; Sitemap</h1>
    <p class="subtitle">Study with Junn — <a href="https://lordjunn.github.io/Study-With-Junn/" style="color:#6e54fa;">lordjunn.github.io/Study-With-Junn</a></p>
    <div class="stats">
      <div class="stat-box">
        <strong><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></strong>
        Total URLs
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th>URL</th>
          <th>Last Modified</th>
          <th>Change Freq</th>
          <th>Priority</th>
        </tr>
      </thead>
      <tbody>
        <xsl:for-each select="sitemap:urlset/sitemap:url">
          <tr>
            <td>
              <a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
            </td>
            <td><xsl:value-of select="sitemap:lastmod"/></td>
            <td><xsl:value-of select="sitemap:changefreq"/></td>
            <td>
              <xsl:choose>
                <xsl:when test="sitemap:priority &gt;= 0.8">
                  <span class="priority-high"><xsl:value-of select="sitemap:priority"/></span>
                </xsl:when>
                <xsl:when test="sitemap:priority &gt;= 0.5">
                  <span class="priority-med"><xsl:value-of select="sitemap:priority"/></span>
                </xsl:when>
                <xsl:otherwise>
                  <span class="priority-low"><xsl:value-of select="sitemap:priority"/></span>
                </xsl:otherwise>
              </xsl:choose>
            </td>
          </tr>
        </xsl:for-each>
      </tbody>
    </table>
  </div>
</body>
</html>
</xsl:template>
</xsl:stylesheet>
