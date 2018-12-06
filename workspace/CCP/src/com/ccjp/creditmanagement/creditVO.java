package com.ccjp.creditmanagement;

import java.util.Date;

public class creditVO {
    
	private String creditcardNumber;
	private String payment;
	private Date paymentDate;
	private Date dueDate;
	private double fine;
	private char rank;
	private String name;
	public creditVO() {
		
	}
	public creditVO(String creditcardNumber, String payment, Date paymentDate,
			Date dueDate, double fine, char rank, String name) {
		this.creditcardNumber = creditcardNumber;
		this.payment = payment;
		this.paymentDate = paymentDate;
		this.dueDate = dueDate;
		this.fine = fine;
		this.rank = rank;
		this.name = name;
	}
	public String getCreditcardNumber() {
		return creditcardNumber;
	}
	public void setCreditcardNumber(String creditcardNumber) {
		this.creditcardNumber = creditcardNumber;
	}
	public String getPayment() {
		return payment;
	}
	public void setPayment(String payment) {
		this.payment = payment;
	}
	public Date getPaymentDate() {
		return paymentDate;
	}
	public void setPaymentDate(Date paymentDate) {
		this.paymentDate = paymentDate;
	}
	public Date getDueDate() {
		return dueDate;
	}
	public void setDueDate(Date dueDate) {
		this.dueDate = dueDate;
	}
	public double getFine() {
		return fine;
	}
	public void setFine(double fine) {
		this.fine = fine;
	}
	public char getRank() {
		return rank;
	}
	public void setRank(char rank) {
		this.rank = rank;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	@Override
	public String toString() {
		return "creditVO [creditcardNumber=" + creditcardNumber + ", payment="
				+ payment + ", paymentDate=" + paymentDate + ", dueDate="
				+ dueDate + ", fine=" + fine + ", rank=" + rank + ", name="
				+ name + "]";
	}
	
	
	

}