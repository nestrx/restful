# Restful
Restful is an [NestJS](https://nestjs.com/) module predefined form of inheritance structure for API when working with [Mongoose](https://mongoosejs.com/) .

## Installation

npm: 
```bash
npm i @nestrx/restful
```
yan
```bash
yan add @nestrx/restful
```

## Configure


app.module.ts
```ts
...
@Module({
	...
	imports: [
		...
		RestfulModule.forRoot()
		...
	],
	...
})
...
```

