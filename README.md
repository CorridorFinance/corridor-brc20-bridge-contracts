# Corridor Brc20 Bridge Evm Contract

## How To

1. Config private key in `.env` file

2. Set network configuration

   add setting block in `hardhat.config.ts`

3. Deploy Contract

   run deploy script

   ```bash
   yarn deploy --network NETWORK
   ```

4. Helpers

- check if you got enough $ETH balance in account

  `yarn debug --network NETWORK`

- test if bridge works fine

  mint a small amount of coin to deployer

  `yarn transfer --network NETWORK`
