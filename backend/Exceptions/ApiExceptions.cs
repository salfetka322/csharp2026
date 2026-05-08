namespace Loomi.Backend.Exceptions;

public class ResourceNotFoundException(string message) : Exception(message);

public class ResourceAlreadyExistsException(string message) : Exception(message);

public class BadCredentialsException(string message) : Exception(message);

public class FileStorageException(string message, Exception? innerException = null) : Exception(message, innerException);
