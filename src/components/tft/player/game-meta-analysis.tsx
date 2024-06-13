'use client'
import { useState } from 'react';
import { AnalyzeMatches } from '@/components/tft/django_api';
import { MetaButton } from '@/components/tft/buttons';
import {
    Modal, 
    ModalContent, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
    useDisclosure
  } from "@nextui-org/modal";
import { Button } from '@nextui-org/button';

export default function MetaAnalysis(puuid: any) {
    const [analysis, setAnalysis] = useState('');
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [gotAnalysis, setGotAnalysis] = useState(false)

    const analyzePerformance = async () => {
        if (gotAnalysis === false) {
            const result = await AnalyzeMatches(puuid.puuid);
            setAnalysis(result.analysis);
            setGotAnalysis(true);
        }
        onOpen();
    };

    return (
        <div>
            <MetaButton onClick={onOpen} />
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1">Meta Analysis</ModalHeader>
                    <ModalBody>
                        WIP
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                    </>
                )}
                </ModalContent>
            </Modal>
        </div>
    );
}