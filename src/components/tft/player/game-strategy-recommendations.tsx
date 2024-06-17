'use client'
import { useState } from 'react';
import { MatchRecommendations } from '@/components/tft/django_api';
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

    const nextMatchRecommendations = async () => {
        if (gotAnalysis === false) {
            const result = await MatchRecommendations(puuid.puuid);
            setAnalysis(result.analysis);
            setGotAnalysis(true);
        }
        onOpen();
    };

    return (
        <div>
            <RecommendationButton onClick={nextMatchRecommendations} />
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='5xl' scrollBehavior='inside' backdrop='opaque'>
                <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1">Next Match Recommendations</ModalHeader>
                    <ModalBody>
                        {analysis}
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