export function train2() {
    let classifier;

    let data = [
        { r: 255, g: 0, b: 0, color: "red-ish" },
        { r: 254, g: 0, b: 0, color: "red-ish" },
        { r: 253, g: 0, b: 0, color: "red-ish" },
        { r: 0, g: 255, b: 0, color: "green-ish" },
        { r: 0, g: 254, b: 0, color: "green-ish" },
        { r: 0, g: 253, b: 0, color: "green-ish" },
        { r: 0, g: 0, b: 255, color: "blue-ish" },
        { r: 0, g: 0, b: 254, color: "blue-ish" },
        { r: 0, g: 0, b: 253, color: "blue-ish" },
    ];

    ml5.setBackend("webgl");


    let options = {
        task: "classification",
        debug: true,
    };

    classifier = ml5.neuralNetwork(options);


    for (let i = 0; i < data.length; i++) {
        let item = data[i];
        let inputs = [item.r, item.g, item.b];
        let outputs = [item.color];
        classifier.addData(inputs, outputs);


    }
    classifier.normalizeData();


    const trainingOptions = {
        epochs: 32,
        batchSize: 12,
    };

    classifier.train(trainingOptions, finishedTraining);

    function finishedTraining() {
        classify();
    }


    let r = 255;
    let g = 0;
    let b = 0;

    function classify() {
        const input = [r, g, b];
        classifier.classify(input, handleResults);
    }

    function handleResults(results, error) {
        if (error) {
            console.error(error);
            return;
        }
        let d = results[0].label;
        console.log(results, d); // {label: 'red', confidence: 0.8};
        // classify();
    }

}