package com.example.SPE_backend.Entities;

import jakarta.persistence.*;

import java.sql.Date;

public class Vehicle_Data {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name="date")
    private Date date;

    @Column(name="startTime")
    private String startTime;

    @Column(name="endTime")
    private String endTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "junctionId")
    private JunctionInfo junctionInfo ;

    @Column(name="vehicleType")
    private String vehicleType;

    @Column(name="vehicleCount")
    private String vehicleCount;




}
