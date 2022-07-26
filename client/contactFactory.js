import { ethers } from "ethers";
import provider from "./provider";

// создаем объект контракта contactFactory
// задаем адрес, abi, провайдера импортируем

const address = "0xc5dFC74D533c624CBa8B86AFea35F14974f94aed";
const abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_telegram",
        type: "string",
      },
    ],
    name: "createContact",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_telegram",
        type: "string",
      },
      {
        internalType: "string",
        name: "_discord",
        type: "string",
      },
    ],
    name: "createContact",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "ownerToContact",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const ethABI = [
  "function ownerToContact(address) public view returns(address)",
  "function createContact(string, string)",
  "function createContact(string)"
]
const contactFactory = new ethers.Contract(address, ethABI, provider);

export default contactFactory;
