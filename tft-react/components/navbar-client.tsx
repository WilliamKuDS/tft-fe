'use client'
import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/react";
import {NavbarItem} from "@nextui-org/navbar";
import {Button} from "@nextui-org/react";
import {Link} from "@nextui-org/link";
import {useState} from "react";


export function TFTDropDown() {
    const [isOpen, setIsOpen] = useState(false);
    const [timeoutId, setTimeoutId] = useState<any>(null);
    const delay = 100;
    return (
        <Dropdown isOpen={isOpen}>
            <NavbarItem key='tft'>
                <DropdownTrigger>
                    <Button variant="light" disableRipple size="sm" radius="none"
                            className="p-0 bg-transparent data-[hover=true]:bg-transparent" color="foreground"
                            style={{fontSize: 15}}
                            onMouseEnter={() => {
                                clearTimeout(timeoutId);
                                setIsOpen(true);
                            }}
                            onMouseLeave={() => {
                                const id = setTimeout(() => setIsOpen(false), delay);
                                setTimeoutId(id);
                            }}
                    >
                        TFT
                    </Button>
                </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu aria-label="TFT Projects"
                          onMouseEnter={() => {
                              clearTimeout(timeoutId);
                              setIsOpen(true);
                          }}
                          onMouseLeave={() => {
                              setIsOpen(false);
                          }}
            >
                <DropdownItem key="search"><Link href="/tft/search" color="foreground">Search
                    Player
                </Link></DropdownItem>
                <DropdownItem key="sim"><Link href="/tft/sim" color="foreground">
                    Simulation
                </Link></DropdownItem>
                <DropdownItem key="ml"><Link href="/tft/ml" color="foreground">Machine
                    Learning
                </Link></DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}
