/**
 * Copyright 2014. Intellect Design Arena Limited. All rights reserved. 
 * 
 * These materials are confidential and proprietary to Intellect Design Arena 
 * Limited and no part of these materials should be reproduced, published, transmitted
 * or distributed in any form or by any means, electronic, mechanical, photocopying, 
 * recording or otherwise, or stored in any information storage or retrieval system 
 * of any nature nor should the materials be disclosed to third parties or used in any 
 * other manner for which this is not authorized, without the prior express written 
 * authorization of Intellect Design Arena Limited.
 * 
 */
cbx.namespace('canvas.applnlayout.tabletop');
canvas.applnlayout.tabletop.component =  Class(cbx.Observable,{
	canvasDockEnabled : true,
	appDockEnabled : false,
	landingPage : {
		enabled : false,
		component : 'sample-landing-page'
	},
	workSpaceLayout : {
		config : {
			activeTab : 0,
			autoHeight : false,
			autoWidth : true,
			border : true,
			frame : true,
			headerCfg : {cls : 'hide-header'},
			onDestroy : function (){this.destroy();},
			plain : true
		}
	},
	headerConfig : {
		enabled : true,
		heightInPx : 80,
		cssClass : '',
		component : 'tabletopheader'
	},
	footerConfig : {
		enabled : true,
		heightInPx : 80,
		position : 'absolute',
		component : 'tabletopfooter'
	}
});

CLCR.registerCmp({"CONFIG":"APPLICATION_LAYOUT","LAYOUT":"TABLE_TOP"},canvas.applnlayout.tabletop.component);