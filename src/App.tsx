import { QuestionAnswer } from './components/QuestionAnswer'
import './App.css'

function App() {

  return (
    <main className="App">
      <QuestionAnswer questionAnswer='Vietnam' questionNumber='A'/>
      <QuestionAnswer questionAnswer='Malaysia' questionNumber='B'/>
      <QuestionAnswer questionAnswer='Sweden' questionNumber='C'/>
      <QuestionAnswer questionAnswer='Austria' questionNumber='D'/>
    </main>
  )
}

export default App
