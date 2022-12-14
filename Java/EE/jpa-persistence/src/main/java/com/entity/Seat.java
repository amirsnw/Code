package com.entity;

import javax.persistence.*;

@Entity
@Table(name = "seats")
public class Seat {

    @Id
    private long id;

    @Enumerated(EnumType.STRING)
    private SeatMaterial seatMaterial;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride( name = "model", column = @Column(name = "seat_belt_model")),
    })
    private SeatBelt seatBelt;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public SeatMaterial getSeatMaterial() {
        return seatMaterial;
    }

    public void setSeatMaterial(SeatMaterial seatMaterial) {
        this.seatMaterial = seatMaterial;
    }

    public SeatBelt getSeatBelt() {
        return seatBelt;
    }

    public void setSeatBelt(SeatBelt seatBelt) {
        this.seatBelt = seatBelt;
    }
}
