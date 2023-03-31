import axios, { type Axios } from 'axios';
import { asyncFaillable } from '@onix/utils';
import {
  alchemyNFTSchema,
  getNFTCollectionResponseSchema,
  getNFTCollectionsResponseSchema,
  type GetNFTCollectionsResponse,
  type AlchemyNFT,
  type NFTCollection,
} from '@onix/schemas';
import { formatNFTImageUrl } from '../utils';

type AlchemyConfig = {
  apiKey: string;
};

export class Alchemy {
  #apiKey: string;
  #httpClient: Axios;

  constructor(config: AlchemyConfig) {
    this.#apiKey = config.apiKey;
    this.#httpClient = axios.create({
      baseURL: `https://eth-mainnet.g.alchemy.com`,
    });
  }

  async getNFT(owner: string, contractAddress: string, tokenId: string): Promise<AlchemyNFT> {
    const response = await asyncFaillable(
      this.#httpClient.get(`/nft/v2/${this.#apiKey}/getNFTMetadata`, {
        params: {
          owner,
          contractAddress,
          tokenId,
        },
      }),
    );

    if (response.failed) {
      throw new Error('Failed to get NFT');
    }

    return alchemyNFTSchema
      .transform((nft) => {
        const imageURL = nft.metadata.image;
        if (imageURL) nft.metadata.image = formatNFTImageUrl(imageURL);
        return nft;
      })
      .parse(response.result.data);
  }

  async getNFTCollection(ownerAddress: string, contractAddress: string): Promise<NFTCollection> {
    const response = await asyncFaillable(
      this.#httpClient.get(`/nft/v2/${this.#apiKey}/getNFTs`, {
        params: {
          owner: ownerAddress,
          contractAddresses: [contractAddress],
          pageSize: 50,
          withMetadata: true,
          excludeFilters: ['AIRDROPS', 'SPAM'],
          spamConfidenceLevel: 'MEDIUM',
        },
      }),
    );

    if (response.failed) {
      throw new Error('Failed to get NFTs');
    }

    return getNFTCollectionResponseSchema
      .transform((data) => {
        return {
          pageKey: data.pageKey,
          totalCount: data.totalCount,
          blockHash: data.blockHash,
          contract: {
            name: data.ownedNfts[0].contractMetadata.name,
            address: data.ownedNfts[0].contract.address,
          },
          nfts: data.ownedNfts.map((nft) => {
            const imageURL = nft.metadata.image;
            if (imageURL) nft.metadata.image = formatNFTImageUrl(imageURL);
            return {
              title: nft.title,
              description: nft.description,
              balance: nft.balance,
              address: nft.contract.address,
              id: Number(nft.id.tokenId).toString(),
              type: nft.id.tokenMetadata.tokenType,
              metadata: nft.metadata,
            };
          }),
        };
      })
      .parse(response.result.data);
  }

  async getNFTCollections(ownerAddress: string): Promise<GetNFTCollectionsResponse> {
    const response = await asyncFaillable<{ data: GetNFTCollectionsResponse }>(
      this.#httpClient.get(`/nft/v2/${this.#apiKey}/getContractsForOwner`, {
        params: {
          owner: ownerAddress,
          pageSize: 50,
          excludeFilters: ['AIRDROPS', 'SPAM'],
          spamConfidenceLevel: 'MEDIUM',
        },
      }),
    );

    if (response.failed) {
      throw new Error('Failed to get NFT collections');
    }

    return getNFTCollectionsResponseSchema.parse(response.result.data);
  }
}
