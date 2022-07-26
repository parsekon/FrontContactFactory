import { ethers } from "ethers";

// из документации ethers необходим провайдер, а в случае его отсутствия задается дефолтный провайдер
let provider;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    provider = new ethers.providers.Web3Provider(window.ethereum);
} else {
    provider = new ethers.providers.JsonRpcProvider();
}
  

export default provider;