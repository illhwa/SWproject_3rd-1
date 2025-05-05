const { ethers } = require('ethers');
require('dotenv').config();

const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_URL);

exports.getCurrentBlock = async () => {
    try {
        const block = await provider.getBlockNumber();
        return block;
    } catch (error) {
        console.error('블록 번호 가져오기 실패:', error);
        throw error;
    }
};

exports.getWalletBalance = async (walletAddress) => {
    try {
        const balanceWei = await provider.getBalance(walletAddress);
        const balanceEth = ethers.formatEther(balanceWei); // 단위 변환: Wei → ETH
        return balanceEth;
    } catch (error) {
        console.error('잔액 조회 실패:', error);
        throw error;
    }
};
