'use client'
import { useState } from 'react';
import { AnalyzeMatches } from '@/components/tft/django_api';
import { RecommendationButton } from '@/components/tft/buttons';
import {
    Modal, 
    ModalContent, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
    useDisclosure
  } from "@nextui-org/modal";
import { Button } from '@nextui-org/button';

export default function StrategyRecommendation(puuid: any) {
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
            <RecommendationButton onClick={onOpen} />
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1">Strategy Recommendation</ModalHeader>
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