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
 
 */
package com.intellectdesign.canvas.servercomm.encryption;

import com.intellectdesign.canvas.exceptions.common.BaseException;

/**
 * Class used to handle Encryption Exception
 * 
 * @version 1.0
 */
public class EncryptionException extends BaseException
{

	/**
	 * Internal constant for serialization purposes
	 */
	private static final long serialVersionUID = -7735618147123876150L;

	/**
	 * Default constructor taking the root cause exception
	 * 
	 */
	public EncryptionException()
	{
		super("ERROR_CODE", "Encryption Failed");
	}

	/**
	 * Overloaded constructor taking the root cause exception
	 * 
	 * @param rootCause
	 */
	public EncryptionException(Exception rootCause)
	{
		super(rootCause);
	}

	/**
	 * Constructor to capture the errorCode and the root cause exception
	 * 
	 * @param errorCode
	 * @param rootCause
	 */
	public EncryptionException(String errorCode, Exception rootCause)
	{
		super(errorCode, rootCause);
	}

	/**
	 * constructor taking errorCode as parameter
	 * 
	 * @param errorCode
	 */
	public EncryptionException(String errorCode)
	{
		super(errorCode);
	}

	/**
	 * Constructor to capture the errorCode and errorMessage
	 * 
	 * @param errorCode
	 * @param errorMessage
	 */
	public EncryptionException(String errorCode, String errorMessage)
	{
		super(errorCode, errorMessage);
	}

	/**
	 * Constructor with error code, message and exception to be wrapped
	 * 
	 * @param errorCode
	 * @param errorMessage
	 * @param wrappedEx
	 */
	public EncryptionException(String errorCode, String errorMessage, Throwable wrappedEx)
	{
		super(errorCode, errorMessage, wrappedEx);
	}

}