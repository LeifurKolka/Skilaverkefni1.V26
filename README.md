# Team Task Hub – React Verkefni

## Kröfur

Búðu til **React + TypeScript** app sem heitir **Team Task Hub** þar sem notendur geta unnið með **projects** og **tasks**.

### Virkni:

- Skoða öll project
- Búa til nýtt project
- Velja project og sjá tilheyrandi task
- Bæta við task
- Breyta task
- Eyða task
- Merkja "task" sem lokið / ólokið
- Leita í "tasks"
- Sía eftir stöðu / forgangi
- Sýna einfalt dashboard með tölfræði

### Gögn og validation

- Gögn skulu vistast í **localStorage**
- Notaðu **Zod** fyrir form validation
- Gögn (projects og tasks) skulu vera **tryggð með typed parsing** þegar þau eru lesin úr localStorage
- Gögn skulu **haldast eftir refresh**

---

## State management

- **Global state** á að nota fyrir:
  - **projects**
  - **tasks**
  - **aðgerðir á þeim** (add, update, delete, toggle complete)
- Nemendur geta valið **annaðhvort**:
  - **Context API + `useReducer`**
  - **External state management** (t.d. Zustand)
- Önnur UI state (modal, search, filters, input values) má geyma sem **local state** í componentum eða custom hooks.

---

## Tæknikröfur

- React functional components
- TypeScript (**ekki nota `any`**)
- Component library (MUI, Chakra, shadcn/ui, Ant Design)
- Hooks (t.d. `useMemo`, `useCallback`, `useRef`)
- Að minnsta kosti 3 custom hooks:
  - `useLocalStorage`
  - `useTaskFilters`
  - einn hook að eigin vali
- Skýrt og skipulagt project architecture
- Endurnýtanlegir components

---

## Reglur og skil

- Minst **8 Git commits**
- Link af repo'inu og myndband sem sýnir fram á virkni

---

# Námsmat (100 stig)

## 1. Virkni – 30 stig

- Projects virka rétt: **10**
- Tasks virka rétt: **10**
- Leit og síur virka: **5**
- Dashboard tölfræði virkar: **5**

## 2. Component design – 20 stig

- Endurnýtanlegir components: **8**
- Typed props og composition: **6**
- Skýr skipting á componentum: **6**

## 3. Hooks og custom hooks – 20 stig

- Advanced hooks notaðir rétt: **8**
- Custom hooks notaðir rétt: **8**
- `useLocalStorage` og filter/search hook til staðar: **4**

## 4. State management – 10 stig

- Projects, tasks og aðgerðir eru í global state: **6**
- Skýr og rökrétt uppbygging á global state: **4**

## 5. localStorage + Zod – 10 stig

- Gögn haldast eftir refresh: **4**
- Typed localStorage logic eða custom hook: **3**
- Zod form validation rétt notað: **3**

## 6. Kóðagæði og skipulag – 10 stig

- Góð mappaskipan: **5**
- TypeScript notað rétt og kóðinn læsilegur: **5**




# Team Task Hub – Prófunarverkefni (skilaverkefni-2)

## Yfirlit

Í **skilaverkefni-2** er markmiðið að **prófa** appið frá **skilaverkefni-1** (Team Task Hub). Þú byggir ofan á lausnina frá skilaverkefni-1: sömu kóðagrunn, sömu virkni og kröfur, en bætir við gagnlegum prófunarverkfærum.

---

## Kröfur (prófunarhluti)

Byggðu ofan á kóðann úr skilaverkefni-1 og bættu við eftirfarandi.

### 1. Vitest (eininga- / component-próf)

- Settu upp **Vitest**.
- Skrifaðu próf sem sýna fram á lykilvirkni (t.d. hægðir, umbreytt components, reikningar, helpers).
- Prófin eiga að keyra með npm

### 2. Storybook

- Settu upp **Storybook** fyrir forritið.
- Búðu til fyrir component einingar (t.d. task/project UI, tómm rými, rök við hlið) svo hægt sé að skoða component í einangrun.

### 3. Cypress (E2E)

- Settu upp **Cypress** með E2E prófum.
- Próf eiga að fara yfir **að minnsta kosti eitt raunverulegt notanda flæði** (t.d. búa til project, bæta við task, merkja lokið – eftir því hvað forritið býður upp á) í **raunlíkum vafra**.

### 4. CI-pípa (próf keyrð sjálfkrafa)

- Settu upp **CI-pípu** sem keyrir **prófin** eftir því sem hægt er, venjulega við `push` og/eða `pull request` á main.
- **Vitest** keyrð í pípunni.
- **Cypress (E2E)** keyrð í pípunni.

## 5. Það eru tveir böggar í kóðanum sem þú átt að finna og leysa. Notaðu prófanir til að átta þig á því hvað þeirr eru!

---

## Tækni og innsending

- Eins og í skilaverkefni-1: **TypeScript** og skýrt skipulag.
- Skilgreindu í `package.json` (eða sambærilegu) hvernig á að keyra Vitest, Storybook og Cypress svo kennari geti fylgt lýsingu.
- Skráðu **CI** í repo (t.d. `.github/workflows/...` á GitHub eða sambærið á öðru kerfi) svo hægt sé að sjá niðurstöðu prófanna í yfirliti.

### Reglur og skil (skilaverkefni-2)

- Minnsta kosti **5 Git commits** sérstaklega tengd prófunum (setup + próf) – eða sambærilegt skýrt stigvaxandi commit history.
- Linkur á **repo** og (ef við á) stutt lýsing á hvernig prófin og **CI** eru keyrð.

---

# Námsmat (100 stig) – prósenta skipt

## 1. Vitest – 32 stig

- Set upp hefur verið gert og próf keyra: **8**
- Gild próf á lógík / einingar: **15**
- Læsilegur prófunarkóði og hæfileg nýting á library (Testing Library o.fl.): **9**

## 2. Storybook – 28 stig

- Storybook ræsir og sögur sýnilegar: **10**
- Fjölbreytt sögur (stöður, props, edge cases): **13**
- Faglegt skipulag sögumappa og samræmt við forritið: **5**

## 3. Cypress E2E – 20 stig

- E2E keyrir markvisst: **6**
- A.m.k. eitt inntaksfært E2E-ás sem sýnir alvöru hegðun: **10**
- Stöðug próf, skýrir selectors, ekki of brothætt: **4**

## 4. Lýsing, skjöl og tenging við skilaverkefni-1 – 10 stig

- Góð skipulag á test innan
- README eða skjöl sem lýsa prófun: **3**
- Aðgengilegar npm-skipanir: **3**

## 5. CI-pípa – 10 stig

- CI-skrá er til staðar og færslur sýnilegar: **3**
- **Vitest** keyrð sjálfkrafa: **4**
- **Cypress** keyrð sjálfkrafa: **3**

---





# Skilaverkefni-2

## Prófanir og gæðatrygging

Þetta verkefni byggir ofan á "Team-task-hub" verkefnið úr Skilaverkefni-1 og bætir við "testing tools" og sjálfvirkni á projectið

### Vitest
keyrir eininga- og component-test: npm run test:run
Ég fann 2 bugs í þessu sectioni og lagaði þær, þegar þú eyðir projecti þá er næsta valið sjálfkrafa og tasks geta ekki lengur verið saved með tómt title eða description 

### Storybook
til að ræsa Storybook locally: npm run storybook
til að byggja Storybook: npm run build-storybook

### Cypress
til að opna Cypress: npm run cypress:open
til að runna Cypress "headlessly": npm run cypress:run

### CI
Github actions workflow er skilgreint í: ".github/workflows/ci.yml"
Ci-Pípan keyrir sjálfkrafa við push og pull requests á "main" og framkvæmir: Vitest próf, Storybook build og Cypress E2E próf