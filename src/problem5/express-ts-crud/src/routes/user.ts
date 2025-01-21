import { Router } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';

export const userRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 */
userRouter.get('/', async (req, res) => {
  const userRepository = getRepository(User);
  const users = await userRepository.find();
  res.json(users);
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User data
 */
userRouter.get('/:id', async (req, res) => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne(req.params.id);
  res.json(user);
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 */
userRouter.post('/', async (req, res) => {
  const userRepository = getRepository(User);
  const user = userRepository.create(req.body);
  const result = await userRepository.save(user);
  res.status(201).json(result);
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated
 */
userRouter.put('/:id', async (req, res) => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne(req.params.id);
  if (user) {
    userRepository.merge(user, req.body);
    const result = await userRepository.save(user);
    res.json(result);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: User deleted
 */
userRouter.delete('/:id', async (req, res) => {
  const userRepository = getRepository(User);
  const result = await userRepository.delete(req.params.id);
  res.status(204).send();
});
