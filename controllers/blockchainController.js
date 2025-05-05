const { getCurrentBlock } = require('../services/blockchainService');

const { getWalletBalance } = require('../services/blockchainService');
const db = require('../models/db');

exports.getBlockNumber = async (req, res) => {
    try {
        const block = await getCurrentBlock();
        res.status(200).json({ blockNumber: block });
    } catch {
        res.status(500).json({ message: '블록 번호 조회 실패' });
    }
};



exports.getMyWalletBalance = (req, res) => {
    const userId = req.user.userId;

    const sql = 'SELECT wallet_address FROM users WHERE id = ?';
    db.query(sql, [userId], async (err, results) => {
        if (err || results.length === 0) {
            return res.status(404).json({ message: '지갑 주소가 없습니다.' });
        }

        const wallet = results[0].wallet_address;
        if (!wallet) {
            return res.status(400).json({ message: '등록된 지갑 주소가 없습니다.' });
        }

        try {
            const balance = await getWalletBalance(wallet);
            res.status(200).json({ wallet_address: wallet, balance: `${balance} ETH` });
        } catch {
            res.status(500).json({ message: '잔액 조회 실패' });
        }
    });
};
