BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Client] (
    [id] NVARCHAR(1000) NOT NULL,
    [fname] NVARCHAR(1000) NOT NULL,
    [lname] NVARCHAR(1000) NOT NULL,
    [age] INT NOT NULL,
    [gender] NVARCHAR(1000) NOT NULL,
    [phone] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Client_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Client_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Client_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[HealthProgram] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [HealthProgram_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [HealthProgram_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Enrollment] (
    [id] NVARCHAR(1000) NOT NULL,
    [clientId] NVARCHAR(1000) NOT NULL,
    [programId] NVARCHAR(1000) NOT NULL,
    [startDate] DATETIME2 NOT NULL,
    CONSTRAINT [Enrollment_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Enrollment] ADD CONSTRAINT [Enrollment_clientId_fkey] FOREIGN KEY ([clientId]) REFERENCES [dbo].[Client]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Enrollment] ADD CONSTRAINT [Enrollment_programId_fkey] FOREIGN KEY ([programId]) REFERENCES [dbo].[HealthProgram]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
