import random

class Cost_Factory():
    def createCost(self, name='greedy', **kwargs):
        costs = {
            'greedy': Cost(**kwargs),
            'size': Cost_Size(**kwargs),
            'value': Cost_Value(**kwargs),
            }
        return costs[name]

######################################################
##############  Costs  ###############################
######################################################
class Cost():
    def __init__(self, **kwargs) -> None:
        try:
            self.values = kwargs['values']
        except KeyError:
            self.values = None
        try:
            self.target = kwargs['target']
        except KeyError:
            self.target = None

    def calculate(self, inOrOut):
        sum = 0
        for element in inOrOut:
            sum += element
        return sum

class Cost_Size(Cost):
    def calculate(self, inOrOut):
        sum = 0
        penalty = 1
        for i, element in enumerate(inOrOut):
            if element:
                sum += self.values[i]
        items = super().calculate(inOrOut)
        if items > self.target:
            penalty = -1
        return sum*penalty

class Cost_Value(Cost):
    def calculate(self, inOrOut):
        sum = 0
        for i, element in enumerate(inOrOut):
            if element:
                sum += self.values[i]
        cost = (self.target-sum)**2
        return cost*-1


#######################################################
class Individual():
    def __init__(self, size) -> None:
        self.items = [0 for _ in range(size)]
        self.cost = 0
    
    def setCost(self, cost):
        self.cost = cost

    def setItems(self, items):
        self.items = items

class RandomMutation():
    def __init__(self) -> None:
        pass

    def _initializePopulation(self, size, pop, cost):
        population = [Individual(size) for _ in range(pop)]
        for individual in population:
            individual.setCost(cost.calculate(individual.items))
        return population

    def fit(self, values, cost, epochs=100, pop = 10):
        size = len(values)
        population = self._initializePopulation(size, pop, cost)
        epoch = 0
        best = 0
        while epoch < epochs:
            if pop > 1:
                for individual in population[1:]:
                    mutation = self.mutate(individual)
                    individual.setItems(mutation)
                    individual.setCost(cost.calculate(mutation))
                population.sort(reverse=True, key=lambda x: x.cost)
            else:
                individual = population[0]
                mutation = self.mutate(individual)
                mutation_cost = cost.calculate(mutation)
                if best <= mutation_cost:
                    individual.setItems(mutation)
                    individual.setCost(mutation_cost)
                    best = mutation_cost
            epoch += 1
        return population[0].items

    def mutate(self, individual):
        mutant = individual.items.copy()
        pos = random.randint(0, len(mutant)-1)
        mutant[pos] = (mutant[pos]-1)**2
        return mutant