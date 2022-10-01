package com.ssafy.db.entity;

import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Getter
@Table(name = "food_commercial")
public class FoodCommercial {
    @Id
    @Column()
    int id;
    @Column
    String category;
    @Column
    int cnt;
    @Column
    String foodDong;

}
