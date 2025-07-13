import { useState } from 'react'
import './App.css'
import { use } from 'react'

function App() {
  const [quantidade, setQuantidade] = useState(0)
  const [mensagem, setMensagem] = useState("")
  const [produto, setProduto] = useState("")
  const [saldo, setSaldo] = useState(100)

  const handlerComprar = async () => {
    try {
      const precos = {
      ipad: 100,
      notebook: 1000,
      teclado: 49,
      iphone: 3000,
      };

      const precoProduto = precos[produto.toLowerCase()] || 0;
      const produtoValido = produto.toLowerCase();

      await fetch('http://localhost:3000/comprar', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({
          produto: produto,
          quantidade: quantidade,
          saldo: saldo,
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error("Saldo insuficiente ou produto inválido");
        }
        return response.json();
      })
      .then(dadosRecebidos => {
        if (!precos[produtoValido]) {
          throw new Error("Produto inválido, verifique o nome do produto.");
        }
        const total = precoProduto * quantidade;
        if (saldo < total) {
          throw new Error("Saldo insuficiente");
        }

        setMensagem(dadosRecebidos.mensagem);
        setSaldo(saldo - (precoProduto * quantidade));
      });

    } catch (error) {
      console.error("Erro:", error);
      setMensagem(error.message);
    }
  }
  return(
    <>
    <h1>Carrinho de compras</h1>
    <h3>Saldo: {saldo}</h3>
    <p>Digite o produto desejado: <br />{produto}</p>
    <input type="text" onChange={prevProduto => setProduto(prevProduto.target.value)} /> <br />
    <p>Quantidade: {quantidade}</p>
    <button onClick={prevQuantidade => setQuantidade(quantidade + 1)}>Adicionar ao carrinho</button>
    <button onClick={prevQuantidade => setQuantidade(quantidade - 1)}>Remover do carrinho</button> <br />
    <button onClick={prevSaldo => setSaldo(saldo + 200)}>Adicionar saldo</button> <br />
    <button onClick={handlerComprar}>Comprar</button> <br />
    <p>{mensagem}</p>
    </>
  )
}

export default App










//   try {
//     if (saldo < precos[produto]) {
//       return (
//       <>
//         <h3>Saldo insuficiente, deseja adicionar saldo?</h3>
//         <button onClick={() => setSaldo(saldo + 200)}>Adicionar R$200,00</button>
//         {/* <button onClick={() => }>Sair</button> */}
//       </>
//       )   
//     } else {
//       console.log("Compra realizada com sucesso!");
//       return (
//         <>
//           {/* <h3>Compra realizada com sucesso!</h3> */}
//           <p>Produto: {produto}</p>
//           <p>Quantidade: {quantidade}</p>
//           <p>Total: R${precos[produto] * quantidade}</p>
//         </>
//       )
//     };
//   } catch (error) {
//     console.error("Erro:", error);
//     return <p>Erro ao processar a compra.</p>
//   }
// };










// import { useState } from 'react'
// import './App.css'
// import { use } from 'react'

// function App() {
//   const [quantidade, setQuantidade] = useState(0)
//   const [mensagem, setMensagem] = useState("")
//   const [produto, setProduto] = useState("")
//   const [saldo, setSaldo] = useState(100)

//   const handlerComprar = async () => {
//     try {
//       const response = await fetch('http://localhost:3000/comprar');
//       if (!response.ok) {
//         alert("Erro ao realizar a compra");
//       }
//       const dados = await response.json();
//       setMensagem(dados.mensagem);
//     } catch (error) {
//       console.error("Erro:", error);
//     }
//   }

//   const itens = () => {
//     const precos = {
//       "Ipad" : 100,
//       "ipad" : 100,
//       "Notebook" : 1000,
//       "notebook" : 1000,
//       "Teclado" : 49,
//       "teclado" : 49,
//       "Iphone" : 3000,
//       "iphone" : 3000,
//     }
//     try {
//       if (saldo < precos[produto]) {
//         return (
//         <>
//           <h3>Saldo insuficiente, deseja adicionar saldo?</h3>
//           <button onClick={() => setSaldo(saldo + 200)}>Adicionar R$200,00</button>
//           {/* <button onClick={() => }>Sair</button> */}
//         </>
//         )   
//       } else {
//         console.log("Compra realizada com sucesso!");
//         return (
//           <>
//             {/* <h3>Compra realizada com sucesso!</h3> */}
//             <p>Produto: {produto}</p>
//             <p>Quantidade: {quantidade}</p>
//             <p>Total: R${precos[produto] * quantidade}</p>
//           </>
//         )
//       };
//     } catch (error) {
//       console.error("Erro:", error);
//       return <p>Erro ao processar a compra.</p>
//     }
//   };
//   return(
//     <>
//     <h1>Carrinho de compras</h1>
//     <h3>Saldo: {saldo}</h3>
//     <p>Digite o produto desejado: <br />{produto}</p>
//     <input type="text" onChange={prevProduto => setProduto(prevProduto.target.value)} /> <br />
//     <p>Quantidade: {quantidade}</p>
//     <button onClick={prevQuantidade => setQuantidade(quantidade + 1)}>Adicionar ao carrinho</button>
//     <button onClick={prevQuantidade => setQuantidade(quantidade - 1)}>Remover do carrinho</button> <br />
//     <button onClick={handlerComprar}>Comprar</button> <br />
//     {itens()}
//     <p>{mensagem}</p>
//     </>
//   )
// }

// export default App