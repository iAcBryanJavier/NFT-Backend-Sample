// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  // const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  // const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  // const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  // const lockedAmount = hre.ethers.utils.parseEther("1");

  // const Lock = await hre.ethers.getContractFactory("Lock");
  // const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

  // await lock.deployed();

  // console.log(
  //   `Lock with 1 ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`
  // );

    const [owner, anotherOwner] = await hre.ethers.getSigners();
    const keyboardsContractFactory = await hre.ethers.getContractFactory(
      'Keyboard'
    );
    const keyboardsContract = await keyboardsContractFactory.deploy();
    await keyboardsContract.deployed();
  
    console.log('Contract deployed to:', keyboardsContract.address);
  
    const keyboardTxn1 = await keyboardsContract.create(0, true, 'hue-rotate-90');
    await keyboardTxn1.wait();
  
    const keyboardTxn2 = await keyboardsContract
      .connect(anotherOwner)
      .create(1, false, 'grayscale');
    await keyboardTxn2.wait();
  
    const balanceBefore = await hre.ethers.provider.getBalance(
      anotherOwner.address
    );
    console.log(
      'anotherOwner balance before!',
      hre.ethers.utils.formatEther(balanceBefore)
    );
  
    const tipTxn = await keyboardsContract.tip(1, {
      value: hre.ethers.utils.parseEther('1000'),
    }); // tip the 2nd keyboard as owner!
    await tipTxn.wait();
  
    const balanceAfter = await hre.ethers.provider.getBalance(
      anotherOwner.address
    );
    console.log(
      'anotherOwner balance after!',
      hre.ethers.utils.formatEther(balanceAfter)
    );
  
    const keyboards = await keyboardsContract.getKeyboards();
    console.log('We got the keyboards!', keyboards);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  