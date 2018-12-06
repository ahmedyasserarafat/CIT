/** * Copyright 2014. Intellect Design Arena Limited. All rights reserved.  *  * These materials are confidential and proprietary to Intellect Design Arena  * Limited and no part of these materials should be reproduced, published, transmitted * or distributed in any form or by any means, electronic, mechanical, photocopying,  * recording or otherwise, or stored in any information storage or retrieval system  * of any nature nor should the materials be disclosed to third parties or used in any  * other manner for which this is not authorized, without the prior express written  * authorization of Intellect Design Arena Limited. *  */cbx.namespace('iportal.workspace.container.master');/** * @class iportal.workspace.container.master provides a container that will load master icons for each tab present in *        the application workspace clicking on which the respective tab panel will be activated. */iportal.workspace.container.master = Ext.extend(Ext.Panel, {	/**	 * 	 */	id : null,	/**	 * 	 */	bundle : CRB.getFWBundleKey(),	/**	 * 	 */	border : false, 	/**	 * 	 */	layout : 'border',	/**	 * 	 */	cls : 'MASTER_SCREEN',	/**	 * 	 */	frame : false,	/**	 * 	 */	wsConf : null,	/**	 * 	 */	initComponent : function ()	{		this.height = iportal.jsutil.getContainerResizeHeight() + 40; // Menu Space Height		this.rb = CRB.getBundle(this.bundle);		var defaultConfig = {			itemId : "MASTER_SCREEN",			collapsible : false,			items : [ this.getSkeleton() ]		};		Ext.apply(this, defaultConfig);		iportal.workspace.container.master.superclass.initComponent.apply(this);	},	/**	 * 	 */	afterRender : function ()	{		if (this.ownerCt != null)			this.ownerCt.doLayout();		iportal.workspace.container.master.superclass.afterRender.apply(this, arguments);	},	/**	 * Method to be called by the parents for removing all the widgets contained under its child container. This method	 * will be used for auto destroying all the widgets when the focus is moved to another workspace or inner tab. The	 * same method will be available down hierarchy till the appropriate container of the widgets.	 */	removeWidgets : function ()	{		this.getComponent("MASTER_CONTAINER").removeAll(true);		iportal.workspace.metadata.setWorkspaceChangeAcceptable(true);	},	/**	 * Method to be called by the parents for re-rendering the widgets again into its container. This will be mostly	 * used when the focus comes back to a workspace or a tab that has been loaded atleast one. The same method will be	 * available down hierarchy till the appropriate container of the widgets.	 */	renderWidgets : function ()	{		var wsManager = iportal.workspace.metadata.getWorkspaceManager();		var container = this.getComponent("MASTER_CONTAINER");		if (wsManager != null)		{			for (var i = 1; i < wsManager.items.length; i++)			{				try				{					container.add({						xtype : 'iportal-master-icon',						height : 48,						width : 160,						scale : 'large',						style : 'margin:10px',						label : wsManager.getComponent(i).title,						iconCls : wsManager.getComponent(i).itemId,						myTabIndex : i,						handler : function ()						{							var ind = this.myTabIndex;							iportal.workspace.metadata.getWorkspaceManager().setActiveTab(ind);						}					});				} catch (e)				{					LOGGER.debug(e);				}			}		}				if (iportal.systempreferences.getDesignCanvasInd())		{			container.add({				xtype : 'iportal-master-icon',				height : 48,				width : 160,				scale : 'large',				style : 'margin:10px',				label : CRB.getFWBundle()['LBL_DYC'], 				iconCls : 'addnewworkspace',				handler : function ()				{					CBXDOWNLOADMGR.requestScripts(cbx.downloadProvider.getMergedArray([ "APPSTORE" ]), function ()					{						cbx.appstore.Jsutil.initAppstore();					});				}			});		}				container.doLayout();	},	/**	 * 	 */	getSkeleton : function ()	{		if (iportal.workspace.metadata.getWorkspaces().length>0 || iportal.systempreferences.getDesignCanvasInd())				{																												//CHG NO WKS MSG		return [ {			region : 'north',			layout : 'fit',			height : 80,			border : false		}, {			region : 'east',			layout : 'fit',			width : 80,			border : false		}, {			region : 'west',			layout : 'fit',			border : false,			width : 50,			html : '&nbsp;'		}, {			region : 'center',			layout : 'column',			cls : 'MASTER_CONTAINER',			itemId : "MASTER_CONTAINER",			width : 850,			height : 550,			autoScroll : true,			defaults : {				bodyStyle : 'padding:0px'			},			layoutConfig : {				columns : 5			}		// ,		// border : true 		} /*			 * , { region : 'south', layout : 'fit', height : 20, border : false }			 */];			}																												else			{			return [ {				region : 'north',				layout : 'fit',				height : 80,				border : false			}, {				region : 'east',				layout : 'fit',				width : 80,				border : false			}, {				region : 'west',				layout : 'fit',				border : false,				width : 50,				html : '&nbsp;'			}, {				region : 'center',				layout : 'column',				cls : 'MASTER_CONTAINER',				itemId : "MASTER_CONTAINER",				items : { html : '<br/><br/><br/><p>'+CRB.getFWBundleValue('LBL_NO_WKS_MSG')+'</p>'},				width : 850,				height : 550,				autoScroll : true,				defaults : {					bodyStyle : 'padding:0px' // UIWSLAYOUT				},				layoutConfig : {					columns : 5				}			// ,//UIWSLAYOUT			// border : true //UIWSLAYOUT			} /*				 * , { region : 'south', layout : 'fit', height : 20, border : false }				 */];// UIWSLAYOUT			}	}																												});/** *  */Ext.reg('master-screen', iportal.workspace.container.master);