# Changelog

## [1.7.0](https://github.com/SrBlecaute01/sisCheck-api/compare/v1.6.0...v1.7.0) (2025-10-29)


### Features

* implementa rota para alterar senha do usuário ([372cf6e](https://github.com/SrBlecaute01/sisCheck-api/commit/372cf6e293ebec54b51b4962bd7f9f665b87e398))
* insere rota para desativar um usuario da aplicação ([8003810](https://github.com/SrBlecaute01/sisCheck-api/commit/8003810985b410ff8b26c3f16aeaf8faebab88b7))

## [1.6.0](https://github.com/SrBlecaute01/sisCheck-api/compare/v1.5.0...v1.6.0) (2025-10-25)


### Features

* adiciona os atributes que devem ser retornados na rota de getAllUsers ([e61c3fa](https://github.com/SrBlecaute01/sisCheck-api/commit/e61c3fa607191f30462887b6aef781b39b33bf3d))

## [1.5.0](https://github.com/SrBlecaute01/sisCheck-api/compare/v1.4.0...v1.5.0) (2025-10-24)


### Features

* rota exposta para puxar users ([d998e5e](https://github.com/SrBlecaute01/sisCheck-api/commit/d998e5e87604607d33d724032bab371119740742))

## [1.4.0](https://github.com/SrBlecaute01/sisCheck-api/compare/v1.3.0...v1.4.0) (2025-10-23)


### Features

* implementa rota para deletar de forma fisica uma atividade do banco de dados ([f3261c8](https://github.com/SrBlecaute01/sisCheck-api/commit/f3261c8f1bd606b6a62649d34db039376b683059))
* implementa um novo service para buscar atividades que o usuário da sessão está participando ([c57e227](https://github.com/SrBlecaute01/sisCheck-api/commit/c57e227dd856f440958ddee3d2574722c58ec6fc))

## [1.3.0](https://github.com/SrBlecaute01/sisCheck-api/compare/v1.2.0...v1.3.0) (2025-10-14)


### Features

* adiciona tratamento de validação para email já existente na base de dados quando tenta registrar um novo user ([889d943](https://github.com/SrBlecaute01/sisCheck-api/commit/889d943e725729f389e218ff27d3bec1e518d51c))
* ajusta a listagem da atividades para ser de forma ascendente com base na data de inicio ([d6f835b](https://github.com/SrBlecaute01/sisCheck-api/commit/d6f835ba48f0d6204af9f3b8d7007c48ece589d7))

## [1.2.0](https://github.com/SrBlecaute01/sisCheck-api/compare/v1.1.2...v1.2.0) (2025-10-09)


### Features

* adiciona rota de do deploy no cors ([8f60d21](https://github.com/SrBlecaute01/sisCheck-api/commit/8f60d21bec2f4b1c16c5205ebc71eb0adf86a1d8))

## [1.1.2](https://github.com/SrBlecaute01/sisCheck-api/compare/v1.1.1...v1.1.2) (2025-10-06)


### Bug Fixes

* update Dockerfile ([8af4a14](https://github.com/SrBlecaute01/sisCheck-api/commit/8af4a148d8a1fbe71075412d156aa06c1e1dae71))

## [1.1.1](https://github.com/SrBlecaute01/sisCheck-api/compare/v1.1.0...v1.1.1) (2025-10-06)


### Bug Fixes

* add missing database name in enviroment variables ([af735c1](https://github.com/SrBlecaute01/sisCheck-api/commit/af735c1fa7949b9198d7e235b506c62a935251d5))
* add missing database name in enviroment variables ([4b17cc5](https://github.com/SrBlecaute01/sisCheck-api/commit/4b17cc5d957e758b3ce78ac41f536feae22916c9))

## [1.1.0](https://github.com/SrBlecaute01/sisCheck-api/compare/v1.0.2...v1.1.0) (2025-10-06)


### Features

* adiciona uma verificação no registro de uma atividade impedindo que seja criada caso já exista alguma que tenha tanto palavra chave de entrada ou saida já registrada ([47a6e21](https://github.com/SrBlecaute01/sisCheck-api/commit/47a6e21f9b6b75b319a6b1e674a7ace7349ea338))


### Bug Fixes

* add quotes to docker run command ([b72e989](https://github.com/SrBlecaute01/sisCheck-api/commit/b72e9892299621e68a70040e2aa013b4b9288bb7))

## [1.0.2](https://github.com/SrBlecaute01/sisCheck-api/compare/v1.0.1...v1.0.2) (2025-10-06)


### Bug Fixes

* deploy script commands ([3e6475e](https://github.com/SrBlecaute01/sisCheck-api/commit/3e6475e321769a268b6cd7cd65fe8de2826e7595))

## [1.0.1](https://github.com/SrBlecaute01/sisCheck-api/compare/v1.0.0...v1.0.1) (2025-10-06)


### Bug Fixes

* docker enviroment variables ([d9c6247](https://github.com/SrBlecaute01/sisCheck-api/commit/d9c624709816fa888248ba744c025eb0452d1435))

## 1.0.0 (2025-10-06)


### Features

* add deployment workflow ([a473ec4](https://github.com/SrBlecaute01/sisCheck-api/commit/a473ec41d81fc0354e5450c6be3ef1bd200806bd))
* add environment configuration file with necessary settings ([d85a12b](https://github.com/SrBlecaute01/sisCheck-api/commit/d85a12be1e651b30c7815f017d4145c9065a37a5))
* addec cpf field to the user; added admin and user seeds to help local development ([d5f0bfe](https://github.com/SrBlecaute01/sisCheck-api/commit/d5f0bfe4e5873767a573f414c46b9c44df54a95a))
* adiciona funcionalidade para gerar QRCode com palavras chaves de entrada e saida da atividade ([93b0de3](https://github.com/SrBlecaute01/sisCheck-api/commit/93b0de3303ff08fd5c3a26b7e0e3d232953e4247))
* adiciona login com cpf e trata registro para evitar que seja salvo com pontuacao no banco ([5843280](https://github.com/SrBlecaute01/sisCheck-api/commit/5843280b6a045844175af8503fb4533799863dcb))
* configure database connection and associations ([765edaa](https://github.com/SrBlecaute01/sisCheck-api/commit/765edaaca12dfeb29fba40a4c9ae72b14ba5c698))
* implement activity management with CRUD operations ([765edaa](https://github.com/SrBlecaute01/sisCheck-api/commit/765edaaca12dfeb29fba40a4c9ae72b14ba5c698))
* implement attendance management with CRUD operations ([765edaa](https://github.com/SrBlecaute01/sisCheck-api/commit/765edaaca12dfeb29fba40a4c9ae72b14ba5c698))
* implement participant management with CRUD operations ([765edaa](https://github.com/SrBlecaute01/sisCheck-api/commit/765edaaca12dfeb29fba40a4c9ae72b14ba5c698))
* implement user authentication and authorization ([765edaa](https://github.com/SrBlecaute01/sisCheck-api/commit/765edaaca12dfeb29fba40a4c9ae72b14ba5c698))
