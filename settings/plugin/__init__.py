# -*- coding: utf-8 -*-
"""
/***************************************************************************
 NapkinGIS plugin
 Publish your projects to NapkinGIS
 ***************************************************************************/
"""
from __future__ import absolute_import

def classFactory(iface):
    from .webgisplugin import WebGisPlugin
    return WebGisPlugin(iface)
