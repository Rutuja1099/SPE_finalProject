package com.example.SPE_backend.Entities;

import jakarta.persistence.Column;

public class JunctionInfo {

    @Column(name="junctionId")
    private Integer junctionId;

    @Column(name="junctionName")
    private String junctionName;
}
