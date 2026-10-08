# Padrões de Implementação

Este guia estabelece diretrizes de nomenclatura e formatação para o desenvolvimento de componentes, interfaces de modelo, classes de serviço, além de outros elementos usados na implementação do front-end da Plataforma Nilo Peçanha.

O objetivo dessas diretrizes é promover uma padronização no código, facilitando a leitura, manutenção e colaboração entre os membros da equipe de desenvolvimento. Além disso, a consistência na nomenclatura e formatação ajuda a reduzir erros e garantir a qualidade do código produzido.

## Sumário

- [Padrões de Implementação](#padrões-de-implementação)
	- [Sumário](#sumário)
	- [Nomenclatura](#nomenclatura)
		- [Nomeação de Componentes](#nomeação-de-componentes)
		- [Classes de Serviço](#classes-de-serviço)
		- [Interfaces](#interfaces)
	- [Formatação](#formatação)
		- [Indentação e Alinhamento](#indentação-e-alinhamento)
		- [Aspas](#aspas)
		- [Ponto e Vírgula](#ponto-e-vírgula)
		- [Espaços](#espaços)
		- [Parênteses](#parênteses)
		- [Props](#props)
		- [Tags](#tags)
		- [Comprimento da linha](#comprimento-da-linha)
		- [Funções](#funções)
		- [Formato de Componentes](#formato-de-componentes)
		- [Variáveis e Parâmetros](#variáveis-e-parâmetros)
	- [Eficiência e performance da aplicação](#eficiência-e-performance-da-aplicação)
		- [`useMemo` e `useCallback`](#usememo-e-usecallback)
		- [`useEffect`](#useeffect)
		- [Estados Locais](#estados-locais)
		- [Hooks de Serviço (`useGetAll`, `useGet`)](#hooks-de-serviço-usegetall-useget)
		- [Resumo de Boas Práticas](#resumo-de-boas-práticas)
	- [Documentação e Organização](#documentação-e-organização)
		- [Complexidade Cognitiva](#complexidade-cognitiva)
		- [Estrutura de Comentários](#estrutura-de-comentários)
		- [Categorização em Interfaces](#categorização-em-interfaces)
		- [Documentação de componentes](#documentação-de-componentes)

## Nomenclatura

### Nomeação de Componentes

- Utilize _`PascalCase`_ para nomear os componentes;
- Omita preposições nos nomes dos componentes. Por exemplo “Barra de Progresso”, deverá ser `BarraProgresso` ;
- Adicione o prefixo `Br` para os componentes. Por exemplo, `BrBarraProgresso` .
  - Observação: Não é necessário adicionar a preposição `Br` em componentes que só existem para compor outros componentes, ou seja, aqueles componentes que não são importados diretamente nas páginas.
- O arquivo em que o componente é implementado deve ser chamado `index.tsx` ;
- Nomeie o diretório do componente com o mesmo nome do componente.

### Classes de Serviço

- Utilize `PascalCase` para nomear as classes de serviço.
- Nomeie o serviço adicionando o sufixo `Service` ao nome do recurso da _API_ que será consumido. Por exemplo, `InstituicaoService`, para o recurso "Instituição".

### Interfaces

- Modelo

  - Utilize _`PascalCase`_ para nomear as interfaces de modelo.
  - Nomeie a interface com o nome da entidade que está sendo definida pela interface. Por exemplo, ao se tratar da entidade Inconsistência de Ensino, use: `InconsistenciaEnsino`.
  - Nomeie interfaces de submissão de dados adicionando o sufixo _`Submit`_. Por exemplo, ao se tratar da entidade Inconsistência de Ensino, use: `InconsistenciaEnsinoSubmit`.

- Props

  - Utilize o mesmo nome do componente sucedido de “Props”. Por exemplo `BrBarraProgressoProps`, para o componente `BrBarraProgresso`.
  - O arquivo em que as props são definidas deve ser nomeado com o nome do componente. Por exemplo `BrBarraProgressoProps` deve ser salvo em um arquivo chamado `BrBarraProgresso.ts`.

- Filtros de Serviço

  - Nomeio o filtro adicionando o sufixo `Filter` ao nome do serviço que será filtrado. Por exemplo, `InstituicaoFilter`, para `InstituicaoService`.

- Interface de Serviço
  - Devem ser nomeadas utilizando o padrão `NomeService`, onde "Nome" representa o recurso da API que será consumido. Por exemplo, se estamos lidando com o recurso "Instituição", a interface de serviço correspondente seria nomeada como `InstituicaoService`.

## Formatação

### Indentação e Alinhamento

- Utilize _tabs_ em vez de espaços para a indentação.
- Configure o tamanho da tabulação como **4 espaços**.
- Todos elementos **JSX** de múltiplas linhas deve ter seu colchete de fechamento alinhado com o de abertura. Por exemplo:

```jsx
// ruim
<Componente
    parametro1="Parametro1"
    parametro2="Parametro2" />;

// ruim
<Componente
    parametro1="Parametro1"
    parametro2="Parametro2"
    />;

// bom
<Componente
    parametro1="Parametro1"
    parametro2="Parametro2"
/>;
```

### Aspas

Utilize **aspas duplas** para strings, em vez de aspas simples.

```jsx
// ruim
<BrButton
    size='small'
/>;

// bom
<BrButton
    size="small"
/>;
```

### Ponto e Vírgula

Sempre insira um ponto e vírgula no final de cada instrução. Por exemplo:

```jsx
const { user } = useStore();

useEffect(() => {
 loadTable();
}, []);
```

### Espaços

- Sempre inclua um único espaço no fechamento de suas tags que não recebem `childrens`.

```jsx
// ruim
<Foo/>

// ruim
<Foo                 />

// ruim
<Foo
 />

// bom
<Foo />
```

- Inclua espaços quando as chaves envolverem uma variável. Por exemplo:

```jsx
// ruim
const {user} = useStore();

// bom
const { user } = useStore();
```

- Não deve-se usar espaços dentro das chaves de parâmetros de um componente. Por exemplo:

```jsx
// ruim
<BrTableAnt
    data={ instituicoes }
    title="Instituições"
/>

// bom
<BrTableAnt
    data={instituicoes}
    title="Instituições"
/>
```

### Parênteses

- Sempre inclua parênteses em torno do parâmetro de uma _`arrow function`_.

Exemplo:

```tsx
const minhaFuncao = (parametro) => {
    return parametro + 1;
};
```

### Props

- Sempre use `camelCase` para nome de props.

```jsx
// ruim
<Componente
    UserName="hello"
    phone_number={12345678}
/>

// bom
<Componente
    userName="hello"
    phoneNumber={12345678}
/>
```

- Quando o valor Booleano for `true`, ele pode ser omitido.

```jsx
// ruim
<Component
    hidden={true}
/>

// bom
<Component
    hidden
/>
```

- Sempre que puder, evite usar `index` como `key` de props. Opte por um `ID`.

```jsx
// ruim
{todos.map((todo, index) => (
    <Todo
        {...todo}
        key={index}
    />
))}

// bom
{todos.map((todo) => (
    <Todo
        {...todo}
        key={todo.id}
    />
))}
```

### Tags

- Sempre utilize tags **auto-fecháveis** para elementos que não possuem filhos.

```jsx
// ruim
<BrIcon icon="times"></BrIcon>

// bom
<BrIcon icon="times" />

// ruim
<img src="..."></img>

// bom
<img src="..." />
```

- Quando o elemento **HTML** ou **JSX** tiver mais de uma propriedade, feche a tag em uma nova linha.

```jsx
// ruim
<BrButton
   secondary
   icon="times"
   circle />

// bom
<BrButton
   secondary
   icon="times"
   circle
/>
```

- Quando o elemento **HTML** ou **JSX** tiver mais de uma propriedade, alinhe-as horizontalmente.

```jsx
// ruim
<BrButton
  secondary
    icon="times"
    circle
/>

// bom
<BrButton
    secondary
    icon="times"
    circle
/>
```

### Comprimento da linha

Recomenda-se que as linhas não ultrapassem em excesso `80` caracteres de comprimento.

```typescript
// ruim
const { handleSubmit, control, reset, getValues, register, setValue, setError, setFocus } = useForm({});

// bom
const {
    handleSubmit,
    control,
    reset,
    getValues,
    register,
    setValue,
    setError,
    setFocus,
} = useForm({});
```

### Funções

- Ao declarar funções sempre opte pela declaração tradicional de função usando a palavra reservada `function` .

```jsx
// ruim
const soma = (a: number, b: number): number => a + b;

// ruim
const soma = function(a: number, b: number): number => {
 return a + b;
}

// bom
function soma(a: number, b: number): number {
 return a + b;
}
```

> Apesar de mais compacta em alguns casos, a declaração de `arrow functions` (que utiliza a palavra `const` ao invés de `function`) pode dificultar a leitura do código em algumas situações. Recomenda-se usar _arrow functions_ somente como [funções callback](https://developer.mozilla.org/pt-BR/docs/Glossary/Callback_function).

- Ao definir uma função, especifique os **tipos dos parâmetros**.

```tsx
// ruim
function soma(a, b): number {
 return a + b;
}

// bom
function soma(a: number, b: number): number {
 return a + b;
}
```

- Sempre defina o **tipo de retorno** da função.

```jsx
// ruim
function soma(a: number, b: number) {
 return a + b;
}

// bom
function soma(a: number, b: number): number {
 return a + b;
}

// ruim
function helloWorld() {
 console.log("Olá, Mundo!");
}

// bom
function helloWorld(): void {
 console.log("Olá, Mundo!");
}
```

### Formato de Componentes

- Ao implementar um componente _React_, **exporte-o** **diretamente na assinatura** da função que o define.

```jsx
// ruim
function BrButton(props: BrButtonProps): JSX.Element { ... }

export default BrButton;

// bom
export default function BrButton(props: BrButtonProps): JSX.Element { ... }
```

- Defina os componentes como **funções**.
  - Por se tratar de funções, respeite as regras descritas na seção [funções](#funções). Use funções tradicionais e defina o tipo do retorno da função.

```jsx
// ruim
const BrButton = (props: BrButtonProps) => { ... }

export default BrButton;

// bom
export default function BrButton(props: BrButtonProps): JSX.Element { ... }
```

### Variáveis e Parâmetros

- Sempre defina o **tipo da variável** no momento da declaração.

```tsx
// ruim
let idade;
const nome;
const estado = "RN";

// bom
let idade: number;
const nome: string;
const estado: string = "RN";
```

- Prefira o uso de `const` para declarar variáveis que não terão seu valor reatribuído.

```tsx
const pi: number = 3.14;
```

- Use `let` apenas para variáveis cujo valor precisará ser reatribuído durante a execução do programa.

```tsx
let contador: number = 0;
```

- Evite declarar variáveis que não serão utilizadas no código.

```tsx
// Evite isso
let variavelNaoUtilizada: string;
```

## Eficiência e performance da aplicação

- Use os **hooks do React** (`useMemo`, `useCallback`, `useEffect`, `useState`) de forma consciente.
    O uso correto ajuda a **evitar renderizações desnecessárias**, **reduzir cálculos repetidos** e **melhorar o desempenho** da aplicação.

### `useMemo` e `useCallback`

Use `useMemo` para **memorizar dados derivados** (listas, cálculos, objetos).
Use `useCallback` para **memorizar funções** passadas como props, evitando recriações a cada renderização.

```tsx
// ruim
function Cursos(): JSX.Element {
    const { data } = useGetAll({ service: CursoService });

    function parseCursos(itens: any[]): any[] {
        return itens.map((i) => ({ ...i, tipo: i.tipo.nome }));
    }
   
    const cursos = parseCursos(data?.data.items ?? []);
   
    return <TabelaCursos data={cursos} />;
}

// bom
function Cursos(): JSX.Element {
    const { data } = useGetAll({ service: CursoService });
   
    const parseCursos = useCallback((itens: Curso[]): ParsedCurso[] => {
        return itens.map((i) => ({ ...i, tipo: i.tipo.nome }));
    }, []);
   
    const cursos: ParsedCurso[] = useMemo(
        () => parseCursos(data?.data.items ?? []),
        [data, parseCursos]
    );
   
    return <TabelaCursos data={cursos} />;
}
```

### `useEffect`

- Utilize `useEffect` apenas para **efeitos colaterais reais** (chamadas de API, timers, event listeners, etc).
- **Evite efeitos que apenas sincronizam estados derivados**, pois podem gerar loops ou re-renderizações desnecessárias.

```tsx
// ruim
useEffect(() => {
    setContadorFiltrado(contador * 2);
}, [contador]);

// bom
const contadorFiltrado = useMemo(() => contador * 2, [contador]);
```

### Estados Locais

- **Mantenha o estado local enxuto.**
    Não armazene no `useState` valores que podem ser derivados de outros estados ou dados da API.

```tsx
// ruim
const [quantidade, setQuantidade] = useState<number>(0);

useEffect(() => {
    setQuantidade(dados.length);
}, [dados]);

// bom

const quantidade = useMemo(() => dados.length, [dados]);
```

---

### Hooks de Serviço (`useGetAll`, `useGet`)

Prefira o uso dos hooks personalizados de serviço para requisições.
Eles já controlam **cache**, **loading**, **refetch** e **tratamento de erros**, dispensando `useEffect` manuais.

```tsx
// ruim
const [dados, setDados] = useState<any[]>([]);
const [isLoading, setIsLoading] = useState<boolean>(true);

useEffect(() => {
    CursoService.getAll().then((res) => {
        setDados(res.data);
        setIsLoading(false);
 });
}, []);
```

```tsx
// ruim
const [dados, setDados] = useState<any[]>([]);
const [isLoading, setIsLoading] = useState<boolean>(true);

function getCursos(): Promise<void> => {
    CursoService.getAll().then((res) => {
        setDados(res.data);
        setIsLoading(false);
 });
}

```

```tsx
// bom
const {
 isPending: isLoadingAll,
 data: dataAll,
 refetchAll,
} = useGetAll<CatalogoCurso>({
 service: CursoCatalogoService,
 filters: filterValues,
});
```

### Resumo de Boas Práticas

✅ **Faça**

- Memorize funções e dados com `useCallback` e `useMemo`;
- Prefira `useGetAll` e `useGet` para requisições;
- Use `useEffect` apenas quando necessário;
- Derive dados sempre que possível, sem criar novos estados.

🚫 **Evite**

- Usar `useEffect` para atualizar estados derivados;
- Declarar funções dentro do componente sem `useCallback`;
- Armazenar dados desnecessários em `useState`;
- Criar múltiplos estados para informações relacionadas.

## Documentação e Organização

### Complexidade Cognitiva

- **Evite funções muito longas,** quebre em funções utilitárias menores e mais específicas.
- Se o código da implementação ultrapassar 100 linhas, quebre em demais arquivos (`services.ts`, `interfaces.ts`, `utils.ts`, etc...) de acordo com o [Padrão Arquitetural](organizacao-diretorios.md).
- Interfaces que passem de 4 linhas devem ser colocadas em um arquivo `interfaces.ts` próprio.

### Estrutura de Comentários

Utilize **blocos de comentários padronizados** para segmentar responsabilidades dentro dos arquivos, facilitando a navegação e compreensão do código. Os comentários servem para **categorizar**, não para explicar funcionamento. Por exemplo:

```tsx
// -----------------------------
// Estados Locais
// -----------------------------
const [loading, setLoading] = useState<boolean>(false);
const [data, setData] = useState<Instituicao[]>([]);

// -----------------------------
// Hooks do React e Form
// -----------------------------
const { handleSubmit, control, reset } = useForm<InstituicaoFilter>();

// -----------------------------
// Query de Instituição
// -----------------------------
const { data: instituicoes, isLoading } = useInstituicaoQuery();

// -----------------------------
// Modais
// -----------------------------
const [showCadastroModal, setShowCadastroModal] = useState<boolean>(false);
const [showEditModal, setShowEditModal] = useState<boolean>(false);
const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
const [showDetalhesModal, setShowDetalhesModal] = useState<boolean>(false);

// -----------------------------
// Funções Auxiliares
// -----------------------------
function handleEdit(id: number): void {
    // lógica de edição
}
```

### Categorização em Interfaces

```tsx
// -----------------------------
// Interfaces de Modelo
// -----------------------------
interface Instituicao {
    id: number;
    nome: string;
}

// -----------------------------
// Interfaces de Submissão
// -----------------------------
interface InstituicaoSubmit {
    nome: string;
}

// -----------------------------
// Interfaces de Filtro
// -----------------------------
interface InstituicaoFilter {
    search?: string;
    status?: boolean;
}
```

- Na renderização, separe os modais do resto da página com o comentário `{/* Modais */}` para melhor legibilidade. Por exemplo:

```tsx
return (
    <div className="container">
        <div className="header">
            <h1>Instituições</h1>
            <BrButton onClick={() => setShowCadastroModal(true)}>
                Nova Instituição
            </BrButton>
        </div>

  {/* Modais */}

  {showCadastroModal && (
      <CadastroInstituicaoModal
          isOpen={showCadastroModal}
          onClose={closeAllModals}
          onSuccess={handleSuccessAction}
      />
  )}

  {showEditModal && selectedItem && (
      <EditInstituicaoModal
          isOpen={showEditModal}
          instituicao={selectedItem}
          onClose={closeAllModals}
          onSuccess={handleSuccessAction}
      />
  )}
 </div>
);
```

### Documentação de componentes

- Ao se criar um novo componente ou um código complexo para auxiliar na aplicação, há uma forma correta de se documentar este trecho de código, como segue o exemplo abaixo:

```tsx
/**
 * Descrição breve do componente novo a ser criado
 *
 * // OPCIONAL CASO HAJA ALGUMA TIPAGEM GENÉRICA
 * @template T Tipo dos dados retornados.
 * 
 * @author 
 *   @liviaaVS // @ DO CRIADOR(A) DO COMPONENTE NOVO
 *
 * // @param {TIPO_DA_PROPRIEDADE} NOME_DA_PROPRIEDADE descrição breve da propriedade
 * 
 * @param {ComponenteNovoProps<T>} props
 * @param {Service} props.service Instância do serviço.
 * **Exemplo:** `PalavraService`, `UsuarioService`, etc.
 * @param {Function} props.method Função do serviço a ser invocada.
 * Pode ser um método padrão (ex.: `service.getAll`) ou um método personalizado (ex.: `service.meuMetodoCustomizado`) .
 * 
 * // [NOME_DA_PROPRIEDADE] acompanhado de colchetes significa OPCIONAL
 * @param {Array} [props.args] Argumentos a serem passados para o método.
 * @param {object} [props.options] Opções adicionais para o `useQuery`.
 * 
 * // @example `EXEMPLO DE VALOR DA PROPRIEDADE`
 * @example
 * `{ refetchOnWindowFocus: false }`
 *
 * // @returns {TIPO_DO_RETORNO} DESCRIÇÃO BREVE DO RETORNO DO COMPONENTE/FUNÇÃO
 * @returns {object} Objeto com:
 * - `isPending` — Estado da consulta
 * - `data` — Dados retornados
 * - `error` — Erro, se houver
 * - `refetch()` — Função para refazer a consulta
 * - `refetchAll()` — Função para invalidar o cache de todas as consultas do mesmo serviço
 *
 * @example // EXEMPLO PRÁTICO DE USO DO COMPONENTE/FUNÇÃO
 * ```ts
 * import { ComponenteNovo } from "@/ComponenteNovo";
 * import PalavraService from "@/services/models/PalavraService";
 *
 * const { isPending, data, error, refetchAll } = ComponenteNovo<PalavraReservada[]>({
 *   service: PalavraService,
 *   method: PalavraService.getAll,
 *   args: [{ limit: 20, offset: 0 }],
 *   options: { refetchOnWindowFocus: false }
 * });
 * ```
 */
export default function ComponenteNovo(props: ComponenteProps): React.ReactNode => {...}
```
