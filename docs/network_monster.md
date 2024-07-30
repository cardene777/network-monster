# Network Monster

## About

自分のペット（NFT）を育てるアプリケーション。
ただし、育てることができるのは自分以外のアドレスからのトランザクションの場合のみ。
NFTはランダムに発行され、他ユーザーからのSOLの送金で成長していく。
繋がりを増やしていくことで自分のモンスターの成長を加速できる、ソーシャル要素を取り入れた育成ゲーム。

## Motivation

Solanaは特に日本においてまだアプリケーションなどで使用されているケースが多くはないはず。
もちろん認知はあるが触れたことがない人も一定数いるはず。
このアプリケーションを通じて、様々なSNSアプリケーションからSolanaへの流入を促すことでSolanaユーザーおよびSolanaに興味を持つユーザーや開発者の増加を目的としている。

## Specification

1. ユーザーはサイトでウォレットを接続してNFTをMint。
2. ランダムにモンスターが選択され、モンスターの見た目や以下のパラメータが確定する。
   - Attack
   - Defense
   - HP
3. メタデータに上記パラメータを含んでMint。
4. Solana Actionsなどを使用してSNSで自分が保有するモンスターを投稿。
5. 自分を知っている人や各SNSでの繋がりを利用してモンスターを成長させる。

## Implementation

今回実装できたのは以下の機能。
- サイトへのウォレット接続。
- NFTのMint。
  - [Metaplex Core](https://developers.metaplex.com/core)を使用
- メタデータの更新部分のみ。
- アドレスからNFTの情報表示。

## 今後

- SOLの送金とそれに応じたモンスターの成長。
- Solana Actionsへの対応。

## Sample NFT Tx

- [Network Monster cardene777](https://core.metaplex.com/explorer/9LAkmG8FKAtP7mrsvEG3DadFWgSbMTpqxd2sM5drg477?env=devnet)
- [Network Monster cardene7777777](https://core.metaplex.com/explorer/EZ1VDJD3xx7LBtkAG2YaqFMCCZavbYJjS3oDFLF5jUao?env=devnet)
- [Network Monster cardene77777777](https://core.metaplex.com/explorer/FxXBRdqci8Y4NEYaTABy9NBKoYFAa94myzS2G2rGNj2B?env=devnet)