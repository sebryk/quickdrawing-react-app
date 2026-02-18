/*
  Warnings:

  - A unique constraint covering the columns `[provider,providerUsername]` on the table `OAuthAccount` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "OAuthAccount_provider_providerUsername_key" ON "OAuthAccount"("provider", "providerUsername");
