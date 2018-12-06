package com.ccjp.creditmanagement;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;



public class creditmgmn {

	public static void main(String[] args) throws creditcardException {

		creditmgmn cd= new creditmgmn();
		cd.process();
	}


	public void process() throws creditcardException{

		///home/ahmed/Desktop
		String readLine=null;
		BufferedReader br =null;
		creditVO cv=null;
		char rank;
		double fine=0.0;
		Map<String,creditVO> amexCard=new HashMap<String,creditVO>();
		Map<String,creditVO> visaCard=new HashMap<String,creditVO>();
		Map<Integer,Map<String,creditVO>> finalOutput=new HashMap<Integer,Map<String,creditVO>>();
		File f=new File(File.separator+"home"+File.separator+"ahmed"+File.separator+"Desktop"+File.separator+"cd.txt");
		try {
			if(f.exists()){
				br =new BufferedReader(new FileReader(f));
				while((readLine=br.readLine())!=null){
					cv=new creditVO();
					String[] hh=readLine.split("\\|");
					validate(hh[0]);
					String creditCardNumber=hh[0];cv.setCreditcardNumber(creditCardNumber);
					String name=hh[1];cv.setName(name);
					String payment=hh[2];cv.setPayment(payment);
					String paymentDate=hh[3];
					String dueDate=hh[4];

					SimpleDateFormat dd=new SimpleDateFormat("dd/MM/yyyy");

					Date pd=dd.parse(paymentDate);cv.setPaymentDate(pd);
					Date dud=dd.parse(dueDate);cv.setDueDate(dud);
					long diffDate=(pd.getTime()-dud.getTime())/(24*60*60*1000);
					System.out.println("diffDate "+diffDate);
					if(creditCardNumber.charAt(0)=='4' && creditCardNumber.length()==16){
						if(pd.before(dud)){
							rank='A';
							fine=0.0;			
						}else{
							if(diffDate<=5){
								rank='B';
								fine=(Integer.parseInt(payment)*10)/100;
							}else{
								rank='B';
								fine=(Integer.parseInt(payment)*20)/100;
							}
						}
						System.out.println("creditCardNumber --"+creditCardNumber);
						cv.setRank(rank);cv.setFine(fine);
						amexCard.put(hh[0], cv);
						
					}
					
					
					if((creditCardNumber.substring(0,2).equals("34") || creditCardNumber.substring(0,2).equals("36") ) 
							&& creditCardNumber.length()==15){
						if(pd.before(dud)){
							rank='A';
							fine=0.0;			
						}else{
							if(diffDate<=5 && Integer.parseInt(payment)<=1500){
								rank='B';
								fine=(Integer.parseInt(payment)*15)/100;
							}else if(diffDate<=5 && Integer.parseInt(payment)>1500){
								rank='B';
								fine=(Integer.parseInt(payment)*20)/100;
							}
							else{
								rank='B';
								fine=(Integer.parseInt(payment)*30)/100;
							}
						}
						cv.setRank(rank);cv.setFine(fine);
						visaCard.put(hh[0], cv);
						
					}

					

				}
				System.out.println("amexCard "+amexCard);
				System.out.println();
				System.out.println("visaCard "+visaCard);
				System.out.println();
				finalOutput.put(1, amexCard);
				finalOutput.put(2, visaCard);
				System.out.println("finalOutput "+finalOutput);
				System.out.println();
				
				Set<Map.Entry<String, creditVO>> gg=amexCard.entrySet();
				for(Map.Entry<String, creditVO> gg1:gg){
					System.out.println(gg1.getKey() +"----"+gg1.getValue());
				}
				Set<Entry<String, creditVO>> jjo=amexCard.entrySet();
				Iterator<Map.Entry<String, creditVO>> ff=jjo.iterator();
				while(ff.hasNext()){
					Map.Entry<String, creditVO> h=ff.next();
					System.out.println(h.getKey()+"------------"+h.getValue());
				}
			}


		} catch (ParseException e) {
			// TODO Auto-generated catch block
			throw new creditcardException("Date Parse Exception");
		}
		catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new creditcardException("File Not Found Exception");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new creditcardException("IOException");
		}
		finally{
			if(br!=null)
				try {
					br.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
		}

	}


	private void validate(String cd) throws creditcardException {
		if(cd!=null && (!"".equals(cd))){
			if(cd.charAt(0)=='4' && cd.length()!=16){
				throw new creditcardException("Invalid Credit Card");
			}
			if((cd.substring(0,2).equals("34") || cd.substring(0,2).equals("36") ) && cd.length()!=15){
				throw new creditcardException("Invalid Credit Card");
			}
		}

	}

}
