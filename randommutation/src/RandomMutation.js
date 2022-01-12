class Cost {
    constructor(values = [], target = 0){
        this.values = values;
        this.target = target;
    }
    cost(inOrOut){
        const reducer = (previousValue, currentValue) => previousValue + currentValue;
        return inOrOut.reduce(reducer);
    }
}

class Cost_Closest extends Cost{
    cost(inOrOut){
        let sum = 0;
        for (let index = 0; index < inOrOut.length; index++) {
            const element = this.values[index];
            if(inOrOut[index] === 1){
                sum += element;
            }
        }
        const error = (this.target - sum)**2;

        return -error;
    }
}

class Cost_Half extends Cost{
    cost(inOrOut){
        const reducer = (previousValue, currentValue) => previousValue + currentValue;
        let penalty = 1;
        if(inOrOut.reduce(reducer) > Math.floor(this.values.length/2)){
            penalty = -1;
        }
        let sum = 0;
        for (let index = 0; index < inOrOut.length; index++) {
            const element = this.values[index];
            if(inOrOut[index] === 1){
                sum += element;
            }
        }
        return sum*penalty;
    }
}

class Individual {
    constructor(values, cost){
        this.items = Array.from({length: values.length}, () => 0);
        this.size = this.items.length;

        this.cost = cost;
        this.own_cost = this.cost.cost(this.items);
    }

    setItems(items){
        this.items = items;
        this.own_cost = this.cost.cost(this.items);
    }

    mutate(){
        let gene = Math.round(Math.random() * this.size-1);
        let genome = this.items.slice();
        genome[gene] = (genome[gene]-1)**2;

        this.setItems(genome);
    }
}

class RandomMutation {
    constructor(values, cost, pop = 10){
        this.population = Array.from({length: pop}, () => new Individual(values, cost));
    }

    fit(epochs){
        let epoch = 0;
        while (epoch < epochs) {
            for (let index = 1; index < this.population.length; index++) {
                const element = this.population[index];
                element.mutate();
            }
            this.population.sort((a,b) => this.sorting(a,b));

            epoch += 1;
        }
    }

    sorting(ind1, ind2){
        return ind2.own_cost-ind1.own_cost;
    }
}

export {RandomMutation, Cost, Cost_Half, Cost_Closest};