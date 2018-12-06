package com.ccp.sample.dateHandling;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

public class calendarFormatting {

	public static void main(String[] args) {
	
		String dd="26/11/2017";
		SimpleDateFormat sf= new SimpleDateFormat("dd/MM/yyyy");
		SimpleDateFormat sf1= new SimpleDateFormat("E, dd-MM-yyyy hh:mm:ss a zzz");
		try {
			Date tt=sf.parse(dd);
		
		Date date=new Date(System.currentTimeMillis());
		System.out.println(dd.toString());
		System.out.println(sf1.format(date));
		
		Calendar cal = Calendar.getInstance();
		
		cal.setTime(tt);
		
		System.out.println(cal.getTime());
		
		cal.add(Calendar.YEAR, 12);
		
		System.out.println("ddd "+cal.get(Calendar.DATE));
		System.out.println(cal.getTime());
		
		
		  
	      // You cannot use Date class to extract individual Date fields
	      int year = cal.get(Calendar.YEAR);
	      int month = cal.get(Calendar.MONTH);      // 0 to 11
	       int day=cal.get(Calendar.DAY_OF_MONTH);
	       
	       int hour=cal.get(Calendar.HOUR_OF_DAY);
	       int minute=cal.get(Calendar.MINUTE);
	       int second=cal.get(Calendar.SECOND);
	       
	       System.out.println(cal.getMaximum(Calendar.DAY_OF_WEEK));
	   
	      System.out.printf("Now is %4d/%02d/%02d %02d:%02d:%02d\n",  // Pad with zero
	          year, month+1, day, hour, minute, second);
	      
	      Calendar cal1 = Calendar.getInstance();
	      cal1.setTime(new Date());
	      System.out.println("cal "+cal.toString());
	      System.out.println("cal 1"+cal1.toString());
	      System.out.println(cal.before(cal1));
	      System.out.println(cal.compareTo(cal1));
	   
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
