// solanaService.js

import  { sendTokenTransaction } from './solanaTransactions.js'

function startTokenTransferScheduler(callback) {
    // Run the code every week in milli seconds ///
    const intervalInWeeks = 1;
    const millisecondsInWeek = 7 * 24 * 60 * 60 * 1000;
    const interval = intervalInWeeks * millisecondsInWeek;
    setInterval(() => {
        sendTokenTransaction();

        callback()
    }, interval);
}

export default startTokenTransferScheduler
