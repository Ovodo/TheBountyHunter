/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { BTY, BTYInterface } from "../BTY";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name_",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol_",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "withdrawTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162000e3838038062000e3883398101604081905262000034916200022b565b8181600362000044838262000323565b50600462000053828262000323565b5050506200008e336200006b6200009660201b60201c565b6200007890600a62000504565b6200008890633b9aca006200051c565b6200009b565b50506200054c565b601290565b6001600160a01b038216620000f65760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015260640160405180910390fd5b80600260008282546200010a919062000536565b90915550506001600160a01b038216600081815260208181526040808320805486019055518481527fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a35050565b505050565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200018e57600080fd5b81516001600160401b0380821115620001ab57620001ab62000166565b604051601f8301601f19908116603f01168101908282118183101715620001d657620001d662000166565b81604052838152602092508683858801011115620001f357600080fd5b600091505b83821015620002175785820183015181830184015290820190620001f8565b600093810190920192909252949350505050565b600080604083850312156200023f57600080fd5b82516001600160401b03808211156200025757600080fd5b62000265868387016200017c565b935060208501519150808211156200027c57600080fd5b506200028b858286016200017c565b9150509250929050565b600181811c90821680620002aa57607f821691505b602082108103620002cb57634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200016157600081815260208120601f850160051c81016020861015620002fa5750805b601f850160051c820191505b818110156200031b5782815560010162000306565b505050505050565b81516001600160401b038111156200033f576200033f62000166565b620003578162000350845462000295565b84620002d1565b602080601f8311600181146200038f5760008415620003765750858301515b600019600386901b1c1916600185901b1785556200031b565b600085815260208120601f198616915b82811015620003c0578886015182559484019460019091019084016200039f565b5085821015620003df5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b634e487b7160e01b600052601160045260246000fd5b600181815b80851115620004465781600019048211156200042a576200042a620003ef565b808516156200043857918102915b93841c93908002906200040a565b509250929050565b6000826200045f57506001620004fe565b816200046e57506000620004fe565b81600181146200048757600281146200049257620004b2565b6001915050620004fe565b60ff841115620004a657620004a6620003ef565b50506001821b620004fe565b5060208310610133831016604e8410600b8410161715620004d7575081810a620004fe565b620004e3838362000405565b8060001904821115620004fa57620004fa620003ef565b0290505b92915050565b60006200051560ff8416836200044e565b9392505050565b8082028115828204841417620004fe57620004fe620003ef565b80820180821115620004fe57620004fe620003ef565b6108dc806200055c6000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c80633950935111610071578063395093511461014357806370a082311461015657806395d89b411461017f578063a457c2d714610187578063a9059cbb1461019a578063dd62ed3e146101ad57600080fd5b806306b091f9146100b957806306fdde03146100ce578063095ea7b3146100ec57806318160ddd1461010f57806323b872dd14610121578063313ce56714610134575b600080fd5b6100cc6100c7366004610742565b6101c0565b005b6100d6610233565b6040516100e3919061076c565b60405180910390f35b6100ff6100fa366004610742565b6102c5565b60405190151581526020016100e3565b6002545b6040519081526020016100e3565b6100ff61012f3660046107ba565b6102df565b604051601281526020016100e3565b6100ff610151366004610742565b610303565b6101136101643660046107f6565b6001600160a01b031660009081526020819052604090205490565b6100d6610325565b6100ff610195366004610742565b610334565b6100ff6101a8366004610742565b6103af565b6101136101bb366004610818565b6103bd565b306000908152602081905260409020548111156102245760405162461bcd60e51b815260206004820152601d60248201527f4e6f7420656e6f75676820746f6b656e7320696e20636f6e747261637400000060448201526064015b60405180910390fd5b61022f3083836103e8565b5050565b6060600380546102429061084b565b80601f016020809104026020016040519081016040528092919081815260200182805461026e9061084b565b80156102bb5780601f10610290576101008083540402835291602001916102bb565b820191906000526020600020905b81548152906001019060200180831161029e57829003601f168201915b5050505050905090565b6000336102d381858561058e565b60019150505b92915050565b6000336102ed8582856106b2565b6102f88585856103e8565b506001949350505050565b6000336102d381858561031683836103bd565b6103209190610885565b61058e565b6060600480546102429061084b565b6000338161034282866103bd565b9050838110156103a25760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b606482015260840161021b565b6102f8828686840361058e565b6000336102d38185856103e8565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6001600160a01b03831661044c5760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b606482015260840161021b565b6001600160a01b0382166104ae5760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b606482015260840161021b565b6001600160a01b038316600090815260208190526040902054818110156105265760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b606482015260840161021b565b6001600160a01b03848116600081815260208181526040808320878703905593871680835291849020805487019055925185815290927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a35b50505050565b6001600160a01b0383166105f05760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b606482015260840161021b565b6001600160a01b0382166106515760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b606482015260840161021b565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b60006106be84846103bd565b9050600019811461058857818110156107195760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e6365000000604482015260640161021b565b610588848484840361058e565b80356001600160a01b038116811461073d57600080fd5b919050565b6000806040838503121561075557600080fd5b61075e83610726565b946020939093013593505050565b600060208083528351808285015260005b818110156107995785810183015185820160400152820161077d565b506000604082860101526040601f19601f8301168501019250505092915050565b6000806000606084860312156107cf57600080fd5b6107d884610726565b92506107e660208501610726565b9150604084013590509250925092565b60006020828403121561080857600080fd5b61081182610726565b9392505050565b6000806040838503121561082b57600080fd5b61083483610726565b915061084260208401610726565b90509250929050565b600181811c9082168061085f57607f821691505b60208210810361087f57634e487b7160e01b600052602260045260246000fd5b50919050565b808201808211156102d957634e487b7160e01b600052601160045260246000fdfea2646970667358221220fe480bdc6d59766e12ba77e7961336ff8a342040e3acf9f33dee07bed439674264736f6c63430008110033";

type BTYConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: BTYConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class BTY__factory extends ContractFactory {
  constructor(...args: BTYConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    name_: string,
    symbol_: string,
    overrides?: Overrides & { from?: string }
  ): Promise<BTY> {
    return super.deploy(name_, symbol_, overrides || {}) as Promise<BTY>;
  }
  override getDeployTransaction(
    name_: string,
    symbol_: string,
    overrides?: Overrides & { from?: string }
  ): TransactionRequest {
    return super.getDeployTransaction(name_, symbol_, overrides || {});
  }
  override attach(address: string): BTY {
    return super.attach(address) as BTY;
  }
  override connect(signer: Signer): BTY__factory {
    return super.connect(signer) as BTY__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BTYInterface {
    return new utils.Interface(_abi) as BTYInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): BTY {
    return new Contract(address, _abi, signerOrProvider) as BTY;
  }
}
