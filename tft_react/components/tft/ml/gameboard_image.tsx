'use client'
import {Image} from "@nextui-org/react";

export function InsertImage(data) {
    return (
        <Image
            alt={data.data.name}
            src={data.data.icon}
            width={50}
            height={50}
        />
    )
}