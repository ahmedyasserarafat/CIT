package com.ccp.sample.coll;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.TreeMap;

public class HMapSortingByvalues {
	 public static void main(String[] args) throws ParseException {
	  /*    HashMap<Integer, String> hmap = new HashMap<Integer, String>();
	      hmap.put(5, "A");
	      hmap.put(11, "C");
	      hmap.put(4, "Z");
	      hmap.put(77, "Y");
	      hmap.put(9, "P");
	      hmap.put(66, "Q");
	      hmap.put(0, "R");
	      System.out.println("Before Sorting:");
	      
	      Set<Map.Entry<Integer, String>> ss=hmap.entrySet();
	      
	      for(Map.Entry<Integer, String> d:ss){
	    	  System.out.println(d.getKey() +"----- "+d.getValue());
	      }
	      
	      System.out.println("After Sorting:");
	      TreeMap<Integer, String> tm=new TreeMap<Integer, String>(hmap);
	      Set<Map.Entry<Integer, String>> ss1=tm.entrySet();
	      
	      for(Map.Entry<Integer, String> d:ss1){
	    	  System.out.println(d.getKey() +"----- "+d.getValue());
	      }
	      
	      Iterator<Entry<Integer, String>> ff=ss1.iterator();
	      while(ff.hasNext()){
	    	  Map.Entry<Integer, String> fff=ff.next();
	    	  System.out.println("ddd" +fff);
	      }*/
	      
	      
	      HashMap<Integer, Employee> map1 = new HashMap<Integer, Employee>();
	      SimpleDateFormat sf= new SimpleDateFormat("dd/MM/yyyy");
	      map1.put(5, new Employee("dd", 1, sf.parse("25/11/2017"), (float) 500.00));
	      map1.put(11, new Employee("ff", 2, sf.parse("24/11/2017"), (float) 3000.00));
	      map1.put(4, new Employee("bb", 3, sf.parse("27/11/2017"), (float) 1500.00));
	      
	      TreeMap<Integer,Employee> ff=new TreeMap(Employee.comp);
			
			ff.putAll(map1);
			
			
			
	      Set<Map.Entry<Integer, Employee>>  hh=map1.entrySet();
	      for(Map.Entry<Integer, Employee> g:hh){
	    	  System.out.println(g.getKey() +"-lllll "+g.getValue());
	      }
	      System.out.println();
	     
	      Iterator<Entry<Integer, Employee>> kk=map1.entrySet().iterator();
	      while(kk.hasNext()){
	    	  Map.Entry<Integer, Employee> fff=kk.next();
	    	  System.out.println("YYYY-" +fff.getKey() +"-----"+fff.getValue());
	      }
	      
	      List<Employee> dd=new ArrayList<>(map1.values());
	      Collections.sort(dd,Employee.comp);
			for(Employee e:dd){
				System.out.println("ggggg="+e);
			}
			
			
	 }
}
