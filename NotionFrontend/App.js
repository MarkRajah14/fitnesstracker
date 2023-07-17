import "./App.css";

import {
    ChakraProvider,
    Center,
    SimpleGrid,
    Heading,
    VStack,
} from "@chakra-ui/react";

import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Label
} from "recharts";

import { useState, useEffect } from "react";

function App() {
    const [weightData, setWeightData] = useState([])
    const [treadmillData, setTreadmillData] = useState([])
    const [bicepsData, setBicepsData] = useState([])
    const [crunchesData, setCrunchesData] = useState([])

    useEffect(() => {
        fetch(
            'http://127.0.0.1:5000/workout_data?metric=Body Weight', {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                },
            }).then((response) => response.json()).then((data) => {
                setWeightData(data)  
            });
    
        fetch(
            'http://127.0.0.1:5000/workout_data?metric=Treadmill Speed', {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                },
            }).then((response) => response.json()).then((data) => {
                setTreadmillData(data)  
            });
    
        fetch(
            'http://127.0.0.1:5000/workout_data?metric=Bicep Curl', {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                },
            }).then((response) => response.json()).then((data) => {
                setBicepsData(data)  
            });

        fetch(
            'http://127.0.0.1:5000/workout_data?metric=Crunches', {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                },
            }).then((response) => response.json()).then((data) => {
                setCrunchesData(data)  
            });
    }, []);

    if(!weightData || !treadmillData || !bicepsData || !crunchesData) {
        return null;
    }
    return (
        <ChakraProvider>
            <Center className='app' bg='#FFE6E3' paddingBottom={24}>
                <VStack>
                  <Heading size='4x1'>Workout Tracker</Heading>  
                  <SimpleGrid columns={2} spacing={10}>
                    <VStack>
                       <Heading>Body Weight</Heading> 
                       <LineChart width={860} height={500} data={weightData}>
                       <Line type="monotone" dataKey="metric" stroke="#8884d8"></Line>
                       <XAxis dataKey='week'>
                        <Label vlue = "Week" offset={0} position="insideBottom"></Label>
                       </XAxis>
                       <YAxis domain={[140,"auto"]} label={{value: "Pounds", position:"insideLeft", angle: -90 }}>
                       </YAxis>
                       <Tooltip></Tooltip>
                       </LineChart> 
                    </VStack>
                    <VStack>
                       <Heading>Treadmill Speed</Heading> 
                       <LineChart width={860} height={500} data={treadmillData}>
                       <Line type="monotone" dataKey="metric" stroke="#8884d8"></Line>
                       <XAxis dataKey='week'>
                        <Label vlue = "Week" offset={0} position="insideBottom"></Label>
                       </XAxis>
                       <YAxis domain={[140,"auto"]} label={{value: "MPH", position:"insideLeft", angle: -90 }}>
                       </YAxis>
                       <Tooltip></Tooltip>
                       </LineChart> 
                    </VStack>
                    <VStack>
                      <Heading>Bicep Curls</Heading>
                      <LineChart width={860} height={500} data={bicepsData}>
                       <Line type="monotone" dataKey="metric" stroke="#8884d8"></Line>
                       <XAxis dataKey='week'>
                        <Label vlue = "Week" offset={0} position="insideBottom"></Label>
                       </XAxis>
                       <YAxis domain={[140,"auto"]} label={{value: "Pounds", position:"insideLeft", angle: -90 }}>
                       </YAxis>
                       <Tooltip></Tooltip>
                       </LineChart> 
                    </VStack>
                    <VStack>
                       <Heading>Crunch</Heading> 
                       <LineChart width={860} height={500} data={crunchesData}>
                       <Line type="monotone" dataKey="metric" stroke="#8884d8"></Line>
                       <XAxis dataKey='week'>
                        <Label vlue = "Week" offset={0} position="insideBottom"></Label>
                       </XAxis>
                       <YAxis domain={[140,"auto"]} label={{value: "Repetitions", position:"insideLeft", angle: -90 }}>
                       </YAxis>
                       <Tooltip></Tooltip>
                       </LineChart> 
                    </VStack>
                  </SimpleGrid>
                </VStack>
            </Center>
        </ChakraProvider>

    );
    }
export default App;