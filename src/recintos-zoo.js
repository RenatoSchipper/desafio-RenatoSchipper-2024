class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanhoTotal: 10, animais: [{ especie: 'MACACO', quantidade: 3, tamanho: 1 }] },
            { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animais: [] },
            { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animais: [{ especie: 'GAZELA', quantidade: 1, tamanho: 2 }] },
            { numero: 4, bioma: 'rio', tamanhoTotal: 8, animais: [] },
            { numero: 5, bioma: 'savana', tamanhoTotal: 9, animais: [{ especie: 'LEAO', quantidade: 1, tamanho: 3 }] }
        ];

        this.animaisPermitidos = {
            LEAO: { tamanho: 3, bioma: ['savana'], carnivoro: true },
            LEOPARDO: { tamanho: 2, bioma: ['savana'], carnivoro: true },
            CROCODILO: { tamanho: 3, bioma: ['rio'], carnivoro: true },
            MACACO: { tamanho: 1, bioma: ['savana', 'floresta'], carnivoro: false },
            GAZELA: { tamanho: 2, bioma: ['savana'], carnivoro: false },
            HIPOPOTAMO: { tamanho: 4, bioma: ['savana', 'rio'], carnivoro: false },
        };
    }
        analisaRecintos(tipoAnimal, quantidade) {
        if (!this.animaisPermitidos[tipoAnimal]) {
            return { erro: 'Animal inválido' };
        }
        if (quantidade <= 0) {
            return { erro: 'Quantidade inválida' };
        }

        const animal = this.animaisPermitidos[tipoAnimal];
        const recintosViaveis = [];

        this.recintos.forEach(recinto => {
            const biomaCompativel = animal.bioma.includes(recinto.bioma) || (recinto.bioma.includes(animal.bioma[0]) && animal.bioma.length > 1);
            if (!biomaCompativel) return;

            let espacoOcupado = recinto.animais.reduce((soma, a) => soma + (a.quantidade * this.animaisPermitidos[a.especie].tamanho), 0);
            const espacoNecessario = quantidade * animal.tamanho;
            let espacoLivre = recinto.tamanhoTotal - espacoOcupado;

            const somenteCarnivoro = recinto.animais.some(a => this.animaisPermitidos[a.especie].carnivoro && a.especie !== tipoAnimal);
            if (somenteCarnivoro || (animal.carnivoro && recinto.animais.length > 0)) {
                return; 
            }

            if (recinto.animais.length > 0 && tipoAnimal !== recinto.animais[0].especie) {
                espacoLivre -= 1; 
            }

            if (espacoLivre >= espacoNecessario) {
                recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre - espacoNecessario} total: ${recinto.tamanhoTotal})`);
            }
        });

        if (recintosViaveis.length === 0) {
            return { erro: 'Não há recinto viável' };
        }

        return { recintosViaveis };
    }
}

export { RecintosZoo as RecintosZoo };
