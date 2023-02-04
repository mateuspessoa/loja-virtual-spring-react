package com.dev.backend.service;

import java.io.FileInputStream;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.dev.backend.entity.Produto;
import com.dev.backend.entity.ProdutoImagens;
import com.dev.backend.repository.ProdutoImagensRepository;
import com.dev.backend.repository.ProdutoRepository;

@Service
public class ProdutoImagensService {
	
	@Autowired
	private ProdutoImagensRepository produtoImagensRepository;
	
	@Autowired
	private ProdutoRepository produtoRepository;
	
	public List<ProdutoImagens> buscarTodos(){
		return produtoImagensRepository.findAll();
	}
	
	public List<ProdutoImagens> buscarPorProduto(Long idProduto){
			List<ProdutoImagens> listaProdutoImagens = produtoImagensRepository.findByProdutoId(idProduto);
			
			for (ProdutoImagens produtoImagens : listaProdutoImagens) {
				try (InputStream in = new FileInputStream("c:/imagens/" + produtoImagens.getNome())) {
					produtoImagens.setArquivo(org.apache.commons.io.IOUtils.toByteArray(in));
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			return listaProdutoImagens;
	}
	
	public ProdutoImagens inserir(Long idProduto, MultipartFile file) {
		Produto produto = produtoRepository.findById(idProduto).get();
		ProdutoImagens produtoImagens = new ProdutoImagens();
		
		try {
			if(!file.isEmpty()) {
				byte[] bytes = file.getBytes();
				String nomeImagem = String.valueOf(produto.getId()) + file.getOriginalFilename();
				Path caminho = Paths.get("c:/imagens/" + nomeImagem);
				Files.write(caminho, bytes);
				produtoImagens.setNome(nomeImagem);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		produtoImagens.setProduto(produto);
		produtoImagens.setDataCriacao(new Date());
		produtoImagens = produtoImagensRepository.saveAndFlush(produtoImagens);
		return produtoImagens;
		
	}
	
	public ProdutoImagens alterar(ProdutoImagens produtoImagens) {
		produtoImagens.setDataAtualizacao(new Date());
		return produtoImagensRepository.saveAndFlush(produtoImagens);
	}
	
	public void excluir(Long id) {
		ProdutoImagens produtoImagens = produtoImagensRepository.findById(id).get();
		produtoImagensRepository.delete(produtoImagens);
	}

}
