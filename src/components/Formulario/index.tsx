import React, { useState } from "react";
import Botao from "../Botao";
import style from "./Formulario.module.scss";
import { ITarefa } from "../../types/tarefa";
import { v4 as uuidv4 } from "uuid";

interface Props {
  setTarefas: React.Dispatch<React.SetStateAction<ITarefa[]>>;
}

function Formulario({ setTarefas }: Props) {
  const [tarefa, setTarefa] = useState("");
  const [tempo, setTempo] = useState("00:00");

  function adicionarTarefa(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setTarefas((prevTarefas) => [
      ...prevTarefas,
      { tarefa, tempo, selecionado: false, completado: false, id: uuidv4() },
    ]);
    setTarefa("");
    setTempo("00:00");
  }

  return (
    <form
      className={style.novaTarefa}
      onSubmit={(evento) => {
        adicionarTarefa(evento);
      }}
    >
      <div className={style.inputContainer}>
        <label htmlFor="tarefa">Adicione um novo estudo</label>
        <input
          type="text"
          name="tarefa"
          id="tarefa"
          placeholder="O que você quer estudar?"
          value={tarefa}
          onChange={(evento) => setTarefa(evento.target.value)}
        />
      </div>
      <div className={style.inputContainer}>
        <label htmlFor="tempo">Tempo</label>
        <input
          type="time"
          step="1"
          name="tempo"
          id="tempo"
          value={tempo}
          min="00:00:00"
          max="1:30:00"
          onChange={(evento) => setTempo(evento.target.value)}
        />
      </div>
      <Botao type="submit">Adicionar</Botao>
    </form>
  );
}

export default Formulario;
