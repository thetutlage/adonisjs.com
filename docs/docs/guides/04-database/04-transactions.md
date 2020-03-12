---
permalink: guides/database/transactions
group: Database
---

# Transactions
Being a SQL ORM, Lucid has first class support for Transactions and save points. By the end of this guide, you will know:

- How to create and manage transactions
- How to create nested transactions (aka save points)
- The concept of using global transactions during tests

## Working with Transactions
Creating a new transaction is as simple as executing the `database.transaction` method.

```ts
import Database from '@ioc:Adonis/Lucid/Database'
const trx = await Database.transaction() // notice it is an async method
```

Once you have received the transaction instance, you can use it to create and run queries.

[codegroup]

```ts{}{Insert}
await trx
  .insertQuery()
  .table('users')
  .insert({ username: 'virk' })
```

```ts{}{Select}
await trx
  .query()
  .select('*')
  .from('users')
```

[/codegroup]

Finally, make sure to `commit` or `rollback` the transaction. For example:

```ts
const trx = await Database.transaction()

try {
  await trx
    .insertQuery()
    .table('users')
    .insert({ username: 'virk' })

  await trx.commit()
} catch (error) {
  await trx.rollback()
}
```

Voila! You have just created and used a transaction.

### Points to Note
- Just like the `Database` object, you can also use the `trx` object to create new queries.
- The `trx.commit` and `trx.rollback` methods are async, so do make sure to put `await` in front of them.
- Lucid reserves a dedicated connection as soon as `Database.transaction()` method is called and releases the connection after commit or rollback actions.

## Passing Transaction as a Reference
The transactions API is not only limited to creating a query builder instance from a transaction object. You can also pass it around to existing query builder instances or models.


```ts
import Database from '@ioc:Adonis/Lucid/Database'
const trx = await Database.transaction()

Database
  .insertQuery({ client: trx }) 👈
  .table('users')
  .insert({ username: 'virk' })
```

Or pass it at a later stage using `useTransaction` method.

```ts
import Database from '@ioc:Adonis/Lucid/Database'
const trx = await Database.transaction()

Database
  .insertQuery()
  .table('users')
  .useTransaction(trx) 👈
  .insert({ username: 'virk' })
```

## Save points
Every time you create a nested transaction, Lucid behinds the scenes creates a new [savepoint](https://en.wikipedia.org/wiki/Savepoint). Since transactions needs a dedicated connection, using savepoints reduces the number of required connections.

```ts
import Database from '@ioc:Adonis/Lucid/Database'
const trx = await Database.transaction()

const savepoint = await trx.transaction()

 // also rollbacks the savepoint
await trx.rollback()
```

## Using Transactions with Lucid Models
