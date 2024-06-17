'use client'
import { useState } from 'react';
import { MatchRecommendations, AnalyzeMatches } from '@/components/tft/django_api';
import { RecommendationButton, AnalyzeButton, MetaButton, DisabledAnalyzeButton, DisabledRecommendationButton } from '@/components/tft/buttons';
import {
    Modal, 
    ModalContent, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
    useDisclosure
  } from "@nextui-org/modal";
import { Button } from '@nextui-org/button';
import { Spacer } from '@nextui-org/spacer';
import {Chip} from "@nextui-org/chip";

export function AISection({puuid} : {puuid: string}){
    return (
        <div style={{display: 'flex', flexDirection: 'row', margin: 'auto', justifyContent: 'space-between'}}>
            <Chip color="danger" size="lg" variant="light" >AI</Chip>
            <PerformanceAnalysis puuid={puuid}/>
            <StrategyRecommendation puuid={puuid}/>
            <Chip color="danger" size="lg" variant="light" >AI</Chip>
        </div>
    )
}

export function DisabledAISection() {
    return (
        <div>
            <p className="text-danger-400 mt-2">Premium Features, request to gain access</p>
            <Spacer y={5}/>
            <div style={{display: 'flex', flexDirection: 'row', margin: 'auto', justifyContent: 'space-between'}}>
                <Chip color="danger" size="lg" variant="light" isDisabled>AI</Chip>
                <DisabledAnalyzeButton/>
                <DisabledRecommendationButton/>
                <Chip color="danger" size="lg" variant="light" isDisabled>AI</Chip>
            </div>
        </div>
    )
}


function PerformanceAnalysis({puuid} : {puuid: string}) {
    const [analysis, setAnalysis] = useState('');
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [gotAnalysis, setGotAnalysis] = useState(false)
    const [loading, setLoading] = useState(false);

    const analyzePerformance = async () => {
        if (gotAnalysis === false) {
            setLoading(true)
            const result = await AnalyzeMatches({puuid});
            setAnalysis(result.analysis);
            setGotAnalysis(true);
            setLoading(false)
        }
        onOpen();
    };

    return (
        <div>
            <AnalyzeButton onPress={analyzePerformance} loading={loading}/>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='5xl' scrollBehavior='inside' backdrop='opaque'>
                <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1">Match History Analysis</ModalHeader>
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

function StrategyRecommendation({puuid} : {puuid: string}) {
    const [analysis, setAnalysis] = useState('');
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [gotAnalysis, setGotAnalysis] = useState(false)
    const [loading, setLoading] = useState(false);
 
    const nextMatchRecommendations = async () => {
        if (gotAnalysis === false) {
            setLoading(true)
            const result = await MatchRecommendations({puuid});
            setAnalysis(result.analysis);
            setGotAnalysis(true);
            setLoading(false)
        }
        onOpen();
    };

    return (
        <div>
            <RecommendationButton onPress={nextMatchRecommendations} loading={loading}/>
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

function MetaAnalysis({puuid} : {puuid: string}) {
    const [analysis, setAnalysis] = useState('');
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [gotAnalysis, setGotAnalysis] = useState(false)

    const analyzePerformance = async () => {
        if (gotAnalysis === false) {
            const result = await AnalyzeMatches({puuid});
            setAnalysis(result.analysis);
            setGotAnalysis(true);
        }
        onOpen();
    };

    return (
        <div>
            <MetaButton onPress={onOpen} />
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