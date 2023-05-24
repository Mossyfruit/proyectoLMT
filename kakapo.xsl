<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/">
		<html>
			<head>
				<link rel="stylesheet" type="text/css" href="kakapo.css"/>
			</head>
			
			<body>
				<xsl:apply-templates/>
			</body>
		</html>
	</xsl:template>
	
	
		<xsl:template match="Parte">
		<p>
			<xsl:value-of select="titulo"/>
		</p>
		<h2>
			<xsl:for-each select="nombre">
				<div>
			<xsl:value-of select="."/>
				</div>
			</xsl:for-each>
		</h2>
	</xsl:template>
	
	 
</xsl:stylesheet>
