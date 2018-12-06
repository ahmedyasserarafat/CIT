package com.ccp.sample.coll;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class employeeList {
	
	private static  List<Employee> dd=new ArrayList<Employee>();
	private static String date1="25/11/2017";
	private static SimpleDateFormat sf= new SimpleDateFormat("dd/MM/yyyy");
   
	
	static{
		try {
			dd=Arrays.asList(
					new Employee("one", 1, sf.parse("25/11/2017"), (float) 500.00),
					new Employee("two", 2, sf.parse("26/11/2017"), (float) 3000.00),
					new Employee("three", 3, sf.parse("27/11/2017"), (float) 1500.00)
					);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		List<String> ff=new ArrayList<String>();
		ff.add("AA");ff.add("DD");ff.add("CC");
		
		String ff1[]={"one","two","ddd"};
		//Array.sort(dd);
		Collections.sort(ff);
		Arrays.sort(ff1);
		for(String e:ff){
			System.out.println(e);
		}
		System.out.println();
		for(String e:ff1){
			System.out.println(e);
		}
		System.out.println();
		
		Collections.sort(dd,Employee.comp);
		for(Employee e:dd){
			System.out.println(e);
		}
	}

}