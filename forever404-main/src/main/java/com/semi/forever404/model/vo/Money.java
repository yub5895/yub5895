package com.semi.forever404.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor
public class Money {
	private int mCode;
	private int useMoney;
	private String buyingList;
	private SmallSchedule smallSchedule;
	
	public Money(SmallSchedule smallSchedule) {
		this.smallSchedule = smallSchedule;
	}

	public int getmCode() {
		return mCode;
	}

	public void setmCode(int mCode) {
		this.mCode = mCode;
	}
	
	
}
