/**
    COPYRIGHT NOTICE

    Copyright 2012 Intellect Design Arena Limited. All rights reserved.

    These materials are confidential and proprietary to 
    Intellect Design Arena Limited and no part of these materials should
    be reproduced, published, transmitted or distributed in any form or
    by any means, electronic, mechanical, photocopying, recording or 
    otherwise, or stored in any information storage or retrieval system
    of any nature nor should the materials be disclosed to third parties
    or used in any other manner for which this is not authorized, without
    the prior express written authorization of Intellect Design Arena Limited.
 */
package com.intellectdesign.canvas.viewdefinition;

/**
 * FW_36_CHACHEFW_ADVGRPGRID
 * 
 * @author harriesh.v
 * 
 */

import java.util.Map;

import  com.intellectdesign.canvas.event.handler.IData;

/**
 * It contains the cache details. This class will be used in CacheCleanupEventHandler.
 * 
 */
public class CacheCleanupData implements IData
{

	/**
	 * Auto generated serial version id.
	 */
	private static final long serialVersionUID = 4L;

	/**
	 * Data Map.
	 */
	private Map<?,?> dataMap;

	/**
	 * @return the dataMap
	 */
	public Map<?,?> getDataMap()
	{
		return dataMap;
	}

	/**
	 * @param dataMap the dataMap to set
	 */
	public void setDataMap(Map<?,?> dataMap)
	{
		this.dataMap = dataMap;
	}

}
